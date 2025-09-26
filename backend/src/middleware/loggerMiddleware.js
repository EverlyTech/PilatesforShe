const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

// Get status color based on HTTP status code
const getStatusColor = (status) => {
  if (status >= 500) return colors.red;
  if (status >= 400) return colors.yellow;
  if (status >= 300) return colors.cyan;
  if (status >= 200) return colors.green;
  return colors.white;
};

// Get method color
const getMethodColor = (method) => {
  switch (method) {
    case 'GET': return colors.green;
    case 'POST': return colors.yellow;
    case 'PUT': return colors.blue;
    case 'PATCH': return colors.magenta;
    case 'DELETE': return colors.red;
    default: return colors.white;
  }
};

// Format duration with appropriate unit
const formatDuration = (duration) => {
  if (duration < 1) {
    return `${(duration * 1000).toFixed(0)}μs`;
  } else if (duration < 1000) {
    return `${duration.toFixed(0)}ms`;
  } else {
    return `${(duration / 1000).toFixed(2)}s`;
  }
};

// Request logger middleware
const requestLogger = (req, res, next) => {
  const startTime = Date.now();
  const timestamp = new Date().toISOString();
  
  // Skip logging for health checks in production
  if (process.env.NODE_ENV === 'production' && req.path === '/api/health') {
    return next();
  }

  // Store original res.end function
  const originalEnd = res.end;
  
  // Override res.end to capture response
  res.end = function(chunk, encoding) {
    const duration = Date.now() - startTime;
    const statusColor = getStatusColor(res.statusCode);
    const methodColor = getMethodColor(req.method);
    
    // Build log message
    const logMessage = [
      `${colors.dim}${timestamp}${colors.reset}`,
      `${methodColor}${req.method}${colors.reset}`,
      `${statusColor}${res.statusCode}${colors.reset}`,
      `${colors.bright}${req.originalUrl}${colors.reset}`,
      `${colors.dim}${formatDuration(duration)}${colors.reset}`,
      `${colors.dim}${req.ip}${colors.reset}`
    ].join(' ');
    
    console.log(logMessage);
    
    // Log additional details for errors or slow requests
    if (res.statusCode >= 400 || duration > 5000) {
      console.log(`${colors.dim}  Details:${colors.reset}`, {
        userAgent: req.get('User-Agent'),
        body: req.body,
        params: req.params,
        query: req.query
      });
    }
    
    // Call original res.end
    originalEnd.call(this, chunk, encoding);
  };
  
  next();
};

// Security logger for auth events
const securityLogger = {
  login: (req, success, user = null) => {
    const message = success ? 
      `✅ Login successful: ${user?.email}` : 
      `❌ Login failed: ${req.body?.email}`;
    
    console.log(`${colors.cyan}[AUTH]${colors.reset} ${message}`, {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      timestamp: new Date().toISOString()
    });
  },
  
  logout: (req, user) => {
    console.log(`${colors.cyan}[AUTH]${colors.reset} ✅ Logout: ${user?.email}`, {
      ip: req.ip,
      timestamp: new Date().toISOString()
    });
  },
  
  register: (req, success, user = null) => {
    const message = success ? 
      `✅ Registration successful: ${user?.email}` : 
      `❌ Registration failed: ${req.body?.email}`;
    
    console.log(`${colors.cyan}[AUTH]${colors.reset} ${message}`, {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      timestamp: new Date().toISOString()
    });
  },
  
  passwordReset: (req, email) => {
    console.log(`${colors.cyan}[AUTH]${colors.reset} 🔑 Password reset requested: ${email}`, {
      ip: req.ip,
      timestamp: new Date().toISOString()
    });
  },
  
  suspiciousActivity: (req, reason, details = {}) => {
    console.warn(`${colors.red}[SECURITY]${colors.reset} ⚠️  Suspicious activity: ${reason}`, {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      url: req.originalUrl,
      method: req.method,
      details,
      timestamp: new Date().toISOString()
    });
  }
};

// Database operation logger
const dbLogger = {
  query: (model, operation, duration, success = true) => {
    if (process.env.NODE_ENV === 'development') {
      const statusSymbol = success ? '✅' : '❌';
      const durationFormatted = formatDuration(duration);
      
      console.log(`${colors.blue}[DB]${colors.reset} ${statusSymbol} ${model}.${operation} ${colors.dim}${durationFormatted}${colors.reset}`);
    }
  },
  
  connection: (event, details = {}) => {
    const symbols = {
      connected: '✅',
      disconnected: '❌',
      error: '🔥',
      reconnected: '🔄'
    };
    
    console.log(`${colors.blue}[DB]${colors.reset} ${symbols[event] || '📊'} ${event}`, details);
  }
};

// Performance logger
const performanceLogger = {
  slow: (req, res, duration) => {
    console.warn(`${colors.yellow}[PERF]${colors.reset} ⚠️  Slow request: ${req.method} ${req.originalUrl} ${formatDuration(duration)}`);
  },
  
  memory: () => {
    if (process.env.NODE_ENV === 'development') {
      const usage = process.memoryUsage();
      console.log(`${colors.magenta}[MEMORY]${colors.reset}`, {
        rss: `${Math.round(usage.rss / 1024 / 1024)}MB`,
        heapTotal: `${Math.round(usage.heapTotal / 1024 / 1024)}MB`,
        heapUsed: `${Math.round(usage.heapUsed / 1024 / 1024)}MB`,
        external: `${Math.round(usage.external / 1024 / 1024)}MB`
      });
    }
  }
};

// Business logic logger
const businessLogger = {
  booking: (action, details) => {
    console.log(`${colors.green}[BOOKING]${colors.reset} ${action}`, details);
  },
  
  payment: (action, details) => {
    console.log(`${colors.yellow}[PAYMENT]${colors.reset} ${action}`, details);
  },
  
  email: (action, recipient, success = true) => {
    const statusSymbol = success ? '✅' : '❌';
    console.log(`${colors.cyan}[EMAIL]${colors.reset} ${statusSymbol} ${action} → ${recipient}`);
  },
  
  membership: (action, details) => {
    console.log(`${colors.magenta}[MEMBERSHIP]${colors.reset} ${action}`, details);
  }
};

// Custom logger for different log levels
const logger = {
  info: (message, data = {}) => {
    console.log(`${colors.blue}[INFO]${colors.reset} ${message}`, data);
  },
  
  warn: (message, data = {}) => {
    console.warn(`${colors.yellow}[WARN]${colors.reset} ${message}`, data);
  },
  
  error: (message, error = {}) => {
    console.error(`${colors.red}[ERROR]${colors.reset} ${message}`, {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
  },
  
  debug: (message, data = {}) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`${colors.dim}[DEBUG]${colors.reset} ${message}`, data);
    }
  },
  
  success: (message, data = {}) => {
    console.log(`${colors.green}[SUCCESS]${colors.reset} ${message}`, data);
  }
};

module.exports = {
  requestLogger,
  securityLogger,
  dbLogger,
  performanceLogger,
  businessLogger,
  logger
};
