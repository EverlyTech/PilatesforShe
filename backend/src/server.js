const express = require('express');
const dotenv = require('dotenv');
const { connectDB, initializeIndexes, seedDatabase } = require('./config/database');

// Load environment variables
dotenv.config();

// Import app
const app = require('./app');

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error('Error:', err.name, err.message);
  console.error('Stack:', err.stack);
  process.exit(1);
});

// Start server function
const startServer = async () => {
  try {
    // Try to connect to database (optional for development)
    console.log('🔄 Attempting to connect to database...');
    try {
      await connectDB();
      
      // Initialize database indexes
      await initializeIndexes();
      
      // Seed initial data if needed
      if (process.env.SEED_DATABASE === 'true') {
        await seedDatabase();
      }
      console.log('✅ Database connection successful');
    } catch (dbError) {
      console.warn('⚠️  Database connection failed:', dbError.message);
      console.warn('📊 Server will start without database connection');
      console.warn('🔧 To fix: Install and start MongoDB, or use a cloud database URL');
    }
    
    // Start server
    const port = process.env.PORT || 5000;
    const server = app.listen(port, () => {
      console.log('🚀 Server is running!');
      console.log(`📍 Port: ${port}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`📊 Health Check: http://localhost:${port}/api/health`);
      console.log(`📚 API Docs: http://localhost:${port}/api/docs`);
      console.log('=====================================');
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err) => {
      console.error('❌ UNHANDLED REJECTION! 💥 Shutting down...');
      console.error('Error:', err.name, err.message);
      console.error('Stack:', err.stack);
      
      server.close(() => {
        process.exit(1);
      });
    });

    // Graceful shutdown
    const gracefulShutdown = (signal) => {
      console.log(`\n⚠️  Received ${signal}. Graceful shutdown initiated...`);
      
      server.close(async () => {
        console.log('📴 HTTP server closed.');
        
        try {
          // Close database connection
          const mongoose = require('mongoose');
          await mongoose.connection.close();
          console.log('📴 Database connection closed.');
          
          console.log('✅ Graceful shutdown completed.');
          process.exit(0);
        } catch (error) {
          console.error('❌ Error during graceful shutdown:', error);
          process.exit(1);
        }
      });
      
      // Force shutdown after 10 seconds
      setTimeout(() => {
        console.error('❌ Could not close connections in time, forcefully shutting down');
        process.exit(1);
      }, 10000);
    };

    // Listen for termination signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    
    return server;
    
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
};

// Only start server if this file is run directly
if (require.main === module) {
  startServer();
}

module.exports = { startServer };
