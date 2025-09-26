# Pilates for She - Full Stack Application

A comprehensive pilates studio management platform built with React frontend and Node.js backend.

## 🏗️ **Project Structure**

```
PilatesforShe/
├── 📱 Frontend (React)          # Client-side application
│   ├── src/
│   ├── public/
│   └── package.json
│
└── 🚀 Backend (Node.js)         # Server-side API
    ├── src/
    │   ├── models/              # Database models
    │   ├── routes/              # API routes
    │   ├── middleware/          # Custom middleware
    │   └── config/              # Configuration files
    ├── DATABASE_SCHEMA.md       # Database documentation
    └── package.json
```

## ✨ **Features**

### **Frontend**
- 🎨 Modern React application with responsive design
- 🧭 React Router for navigation
- 📱 Mobile-optimized user interface
- 🎯 Class scheduling and booking interface
- 👤 User authentication and profile management
- 💰 Membership plans and pricing display
- 📞 Contact form integration

### **Backend**
- 🚀 Express.js REST API
- 🗄️ MongoDB database with Mongoose ODM
- 🔐 JWT authentication and authorization
- 📧 Email verification and password reset
- 💳 Stripe payment integration (configured)
- 📊 Comprehensive logging and monitoring
- 🛡️ Security middleware and data validation

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn package manager

### **Frontend Setup**
```bash
# Install frontend dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

### **Backend Setup**
```bash
# Navigate to backend directory
cd backend

# Install backend dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your settings

# Start development server
npm run dev

# Start production server
npm start
```

## 🗄️ **Database Schema**

The application uses MongoDB with the following collections:
- **Users** - User accounts, authentication, and profiles
- **Classes** - Class schedules and instructor assignments
- **Bookings** - Class reservations and waitlist management
- **MembershipPlans** - Subscription plans and pricing
- **Events** - Special events and workshops
- **ContactForms** - Contact form submissions and management

📋 **Detailed schema documentation**: [DATABASE_SCHEMA.md](./backend/DATABASE_SCHEMA.md)

## 🔧 **Environment Variables**

### **Backend (.env)**
```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/pilates-for-she

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d

# CORS Configuration
FRONTEND_URL=http://localhost:3000

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## 📡 **API Endpoints**

### **Authentication**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset

### **Users**
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/password` - Change password

### **Classes**
- `GET /api/classes` - Get class schedule
- `GET /api/classes/:id` - Get class details
- `POST /api/classes` - Create new class (admin)
- `PUT /api/classes/:id` - Update class (admin)

### **Bookings**
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

### **Memberships**
- `GET /api/memberships` - Get membership plans
- `POST /api/memberships/subscribe` - Subscribe to plan

### **Events**
- `GET /api/events` - Get events
- `POST /api/events/:id/register` - Register for event

### **Contact**
- `POST /api/contact` - Submit contact form

### **System**
- `GET /api/health` - Health check
- `GET /api/docs` - API documentation

## 🛡️ **Security Features**

- **Authentication**: JWT-based with secure password hashing
- **Authorization**: Role-based access control (member, instructor, admin)
- **Data Validation**: Comprehensive input validation and sanitization
- **Rate Limiting**: API request throttling
- **CORS**: Cross-origin resource sharing configuration
- **Security Headers**: Helmet.js for security headers
- **Environment Security**: Sensitive data in environment variables

## 🧪 **Development**

### **Frontend Development**
```bash
# Start with hot reload
npm start

# Run tests
npm test

# Lint code
npm run lint
```

### **Backend Development**
```bash
cd backend

# Start with nodemon (auto-restart)
npm run dev

# Seed database with initial data
npm run seed

# View logs
tail -f logs/app.log
```

## 🚀 **Deployment**

### **Frontend Deployment**
- Build optimized production bundle
- Deploy to Netlify, Vercel, or similar platform
- Configure environment variables

### **Backend Deployment**
- Deploy to Heroku, Railway, or similar platform
- Set up MongoDB Atlas for cloud database
- Configure production environment variables
- Set up SSL/TLS certificates

## 🔗 **Technology Stack**

### **Frontend**
- **React** - UI library
- **React Router** - Client-side routing
- **CSS3** - Styling and animations
- **Fetch API** - HTTP client

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Stripe** - Payment processing

### **Development Tools**
- **nodemon** - Development server
- **ESLint** - Code linting
- **dotenv** - Environment management

## 📞 **Support**

For questions or support, please contact:
- **Email**: hello@madebysolace.com
- **Phone**: (626) 555-0123
- **Address**: 188 S Monterey St #106, Alhambra, CA 91801

## 📄 **License**

This project is proprietary and confidential. All rights reserved.

---

**Built with ❤️ for the Pilates for She community**