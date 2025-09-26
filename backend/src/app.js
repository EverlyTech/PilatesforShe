const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');

// Import middleware
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const { requestLogger } = require('./middleware/loggerMiddleware');

// Import routes
const healthRoutes = require('./routes/healthRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const classRoutes = require('./routes/classRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const membershipRoutes = require('./routes/membershipRoutes');
const eventRoutes = require('./routes/eventRoutes');

// Create Express application
const app = express();

// Trust proxy (for deployment behind reverse proxy)
app.set('trust proxy', 1);

// Security Middleware
// ====================

// Set security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply rate limiting to all requests
app.use(limiter);

// Stricter rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs for auth routes
  message: {
    error: 'Too many authentication attempts, please try again later.',
  },
  skipSuccessfulRequests: true, // Don't count successful requests
});

// CORS Configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests) in development
    if (!origin && process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'https://pilates-for-she.netlify.app', // Example deployment URL
      'https://pilates-for-she.vercel.app'    // Example deployment URL
    ].filter(Boolean); // Remove undefined values
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // In development, allow all origins
      if (process.env.NODE_ENV === 'development') {
        return callback(null, true);
      }
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow credentials (cookies, authorization headers)
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

app.use(cors(corsOptions));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp({
  whitelist: ['sort', 'fields', 'page', 'limit'] // Allow these query parameters to be duplicated
}));

// Compression middleware
app.use(compression());

// Body Parser Middleware
// ======================

// Parse JSON bodies (with size limit)
app.use(express.json({
  limit: '10mb',
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));

// Parse URL-encoded bodies
app.use(express.urlencoded({ 
  extended: true, 
  limit: '10mb' 
}));

// Custom Middleware
// =================

// Request logging
app.use(requestLogger);

// Health check endpoint (before other routes)
app.get('/', (req, res) => {
  res.json({
    message: 'Pilates for She API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
    docs: '/api/docs',
    health: '/api/health'
  });
});

// API Routes
// ==========

// Health and system routes
app.use('/api/health', healthRoutes);

// Authentication routes (with stricter rate limiting)
app.use('/api/auth', authLimiter, authRoutes);

// User management routes
app.use('/api/users', userRoutes);

// Contact form routes
app.use('/api/contact', contactRoutes);

// Class management routes
app.use('/api/classes', classRoutes);

// Booking management routes
app.use('/api/bookings', bookingRoutes);

// Membership plan routes
app.use('/api/memberships', membershipRoutes);

// Event management routes
app.use('/api/events', eventRoutes);

// API Documentation (in development)
if (process.env.NODE_ENV === 'development') {
  app.get('/api/docs', (req, res) => {
    res.json({
      message: 'API Documentation',
      version: '1.0.0',
      endpoints: {
        health: {
          'GET /api/health': 'System health check',
          'GET /api/health/database': 'Database health check'
        },
        auth: {
          'POST /api/auth/register': 'User registration',
          'POST /api/auth/login': 'User login',
          'POST /api/auth/logout': 'User logout',
          'POST /api/auth/forgot-password': 'Forgot password',
          'POST /api/auth/reset-password': 'Reset password',
          'POST /api/auth/verify-email': 'Verify email'
        },
        users: {
          'GET /api/users/profile': 'Get user profile',
          'PUT /api/users/profile': 'Update user profile',
          'PUT /api/users/password': 'Change password',
          'DELETE /api/users/account': 'Delete account'
        },
        contact: {
          'POST /api/contact': 'Submit contact form',
          'GET /api/contact (admin)': 'Get contact submissions'
        },
        classes: {
          'GET /api/classes': 'Get class schedule',
          'GET /api/classes/:id': 'Get class details',
          'POST /api/classes (admin)': 'Create new class',
          'PUT /api/classes/:id (admin)': 'Update class',
          'DELETE /api/classes/:id (admin)': 'Delete class'
        },
        bookings: {
          'GET /api/bookings': 'Get user bookings',
          'POST /api/bookings': 'Create booking',
          'PUT /api/bookings/:id': 'Update booking',
          'DELETE /api/bookings/:id': 'Cancel booking'
        },
        memberships: {
          'GET /api/memberships': 'Get membership plans',
          'GET /api/memberships/:id': 'Get plan details',
          'POST /api/memberships/subscribe': 'Subscribe to plan'
        },
        events: {
          'GET /api/events': 'Get events',
          'GET /api/events/:id': 'Get event details',
          'POST /api/events/:id/register': 'Register for event'
        }
      }
    });
  });
}

// Error Handling Middleware
// =========================

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

module.exports = app;
