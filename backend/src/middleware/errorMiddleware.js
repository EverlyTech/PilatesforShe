const mongoose = require('mongoose');

// Error response utility
const sendErrorResponse = (res, error, statusCode = 500) => {
  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  res.status(statusCode).json({
    success: false,
    error: {
      message: error.message,
      ...(isDevelopment && { 
        stack: error.stack,
        details: error 
      })
    },
    timestamp: new Date().toISOString()
  });
};

// Handle specific MongoDB/Mongoose errors
const handleMongoErrors = (error) => {
  let message = error.message;
  let statusCode = 500;

  // Mongoose validation error
  if (error.name === 'ValidationError') {
    const errors = Object.values(error.errors).map(err => err.message);
    message = `Validation Error: ${errors.join(', ')}`;
    statusCode = 400;
  }
  
  // Mongoose duplicate key error
  else if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    message = `Duplicate ${field}: ${error.keyValue[field]} already exists`;
    statusCode = 400;
  }
  
  // Mongoose cast error (invalid ObjectId)
  else if (error.name === 'CastError') {
    message = `Invalid ${error.path}: ${error.value}`;
    statusCode = 400;
  }
  
  // MongoDB connection error
  else if (error.name === 'MongoNetworkError') {
    message = 'Database connection error';
    statusCode = 503;
  }
  
  // MongoDB timeout error
  else if (error.name === 'MongoTimeoutError') {
    message = 'Database operation timed out';
    statusCode = 503;
  }

  return { message, statusCode };
};

// Handle JWT errors
const handleJWTErrors = (error) => {
  let message = error.message;
  let statusCode = 401;

  if (error.name === 'JsonWebTokenError') {
    message = 'Invalid token. Please log in again.';
  } else if (error.name === 'TokenExpiredError') {
    message = 'Your token has expired. Please log in again.';
  }

  return { message, statusCode };
};

// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error
  console.error('🔥 Error:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    body: req.body,
    params: req.params,
    query: req.query,
    timestamp: new Date().toISOString()
  });

  // Handle specific error types
  if (error.name === 'ValidationError' || error.code === 11000 || error.name === 'CastError') {
    const { message, statusCode } = handleMongoErrors(error);
    error.message = message;
    error.statusCode = statusCode;
  }
  
  else if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
    const { message, statusCode } = handleJWTErrors(error);
    error.message = message;
    error.statusCode = statusCode;
  }
  
  // Handle custom application errors
  else if (error.statusCode) {
    // Error already has a status code (from our application)
  }
  
  // Default to 500 server error
  else {
    error.statusCode = 500;
    error.message = 'Internal Server Error';
  }

  sendErrorResponse(res, error, error.statusCode);
};

// 404 Not Found handler
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  
  console.log('🔍 404 Error:', {
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });
  
  next(error);
};

// Async error handler wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Custom error class for application errors
class AppError extends Error {
  constructor(message, statusCode = 500, isOperational = true) {
    super(message);
    
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    
    Error.captureStackTrace(this, this.constructor);
  }
}

// Validation error helper
const createValidationError = (field, message) => {
  return new AppError(`${field}: ${message}`, 400);
};

// Authentication error helper
const createAuthError = (message = 'Authentication failed') => {
  return new AppError(message, 401);
};

// Authorization error helper
const createAuthorizationError = (message = 'Access denied') => {
  return new AppError(message, 403);
};

// Not found error helper
const createNotFoundError = (resource = 'Resource') => {
  return new AppError(`${resource} not found`, 404);
};

// Rate limit error helper
const createRateLimitError = (message = 'Too many requests') => {
  return new AppError(message, 429);
};

module.exports = {
  errorHandler,
  notFound,
  asyncHandler,
  AppError,
  createValidationError,
  createAuthError,
  createAuthorizationError,
  createNotFoundError,
  createRateLimitError,
  sendErrorResponse
};
