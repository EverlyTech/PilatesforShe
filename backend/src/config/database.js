const mongoose = require('mongoose');

// Database connection configuration
const connectDB = async () => {
  try {
    // Connection options for security and performance
    const options = {
      // Connection pool settings
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 2000, // Keep trying to send operations for 2 seconds
      socketTimeoutMS: 5000, // Close sockets after 5 seconds of inactivity
      connectTimeoutMS: 2000, // Give up initial connection after 2 seconds
      family: 4, // Use IPv4, skip trying IPv6
      
      // Buffer settings (handled by Mongoose, not MongoDB driver)
      // bufferMaxEntries: 0, // Disable mongoose buffering
      // bufferCommands: false, // Disable mongoose buffering
      
      // Retry settings
      retryWrites: true,
      retryReads: true,
      
      // SSL/TLS settings (for production)
      ...(process.env.NODE_ENV === 'production' && {
        ssl: true,
        sslValidate: true,
      })
    };

    // Set Mongoose buffer settings (using correct option names)
    mongoose.set('bufferCommands', false);
    
    // Connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGODB_URI, options);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}:${conn.connection.port}/${conn.connection.name}`);
    
    // Connection event listeners
    mongoose.connection.on('connected', () => {
      console.log('✅ Mongoose connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  Mongoose disconnected from MongoDB');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        console.log('📴 MongoDB connection closed through app termination');
        process.exit(0);
      } catch (error) {
        console.error('❌ Error during database disconnection:', error);
        process.exit(1);
      }
    });

    return conn;
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    
    // Exit process with failure if in production
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
    
    throw error;
  }
};

// Database health check
const checkDatabaseHealth = async () => {
  try {
    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database is not connected');
    }

    // Perform a simple operation to verify connection
    await mongoose.connection.db.admin().ping();
    
    return {
      status: 'healthy',
      database: mongoose.connection.name,
      host: mongoose.connection.host,
      port: mongoose.connection.port,
      readyState: mongoose.connection.readyState,
      collections: Object.keys(mongoose.connection.collections).length
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      error: error.message,
      readyState: mongoose.connection.readyState
    };
  }
};

// Get database statistics
const getDatabaseStats = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database is not connected');
    }

    const db = mongoose.connection.db;
    const admin = db.admin();
    
    // Get database stats
    const dbStats = await db.stats();
    
    // Get server status (if user has privileges)
    let serverStatus = null;
    try {
      serverStatus = await admin.serverStatus();
    } catch (err) {
      console.log('Cannot retrieve server status (insufficient privileges)');
    }

    // Get collection stats
    const collections = await db.listCollections().toArray();
    const collectionStats = {};
    
    for (const collection of collections) {
      try {
        const stats = await db.collection(collection.name).stats();
        collectionStats[collection.name] = {
          count: stats.count,
          size: stats.size,
          storageSize: stats.storageSize,
          indexes: stats.nindexes
        };
      } catch (err) {
        collectionStats[collection.name] = { error: 'Cannot retrieve stats' };
      }
    }

    return {
      database: {
        name: dbStats.db,
        collections: dbStats.collections,
        objects: dbStats.objects,
        dataSize: dbStats.dataSize,
        storageSize: dbStats.storageSize,
        indexes: dbStats.indexes,
        indexSize: dbStats.indexSize
      },
      server: serverStatus ? {
        version: serverStatus.version,
        uptime: serverStatus.uptime,
        connections: serverStatus.connections
      } : null,
      collections: collectionStats,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    throw new Error(`Failed to get database stats: ${error.message}`);
  }
};

// Initialize database indexes
const initializeIndexes = async () => {
  try {
    console.log('🔄 Initializing database indexes...');
    
    // User model indexes
    const User = require('../models/User');
    await User.createIndexes();
    
    // ContactForm model indexes
    const ContactForm = require('../models/ContactForm');
    await ContactForm.createIndexes();
    
    // Class model indexes
    const Class = require('../models/Class');
    await Class.createIndexes();
    
    // Booking model indexes
    const Booking = require('../models/Booking');
    await Booking.createIndexes();
    
    // MembershipPlan model indexes
    const MembershipPlan = require('../models/MembershipPlan');
    await MembershipPlan.createIndexes();
    
    // Event model indexes
    const Event = require('../models/Event');
    await Event.createIndexes();
    
    console.log('✅ Database indexes initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing indexes:', error.message);
    throw error;
  }
};

// Seed initial data
const seedDatabase = async () => {
  try {
    console.log('🌱 Seeding initial database data...');
    
    const User = require('../models/User');
    const MembershipPlan = require('../models/MembershipPlan');
    const Class = require('../models/Class');
    
    // Check if admin user exists
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      await User.create({
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@pilatesforshe.com',
        password: 'Admin123!',
        role: 'admin',
        emailVerified: true,
        isActive: true
      });
      console.log('✅ Admin user created');
    }
    
    // Check if membership plans exist
    const plansExist = await MembershipPlan.countDocuments();
    if (plansExist === 0) {
      const defaultPlans = [
        {
          name: '4 Classes per Month',
          price: 118,
          classesIncluded: 4,
          billingCycle: 'monthly',
          redLightSessions: 2,
          features: ['4 Lagree Fitness classes', '2 free Red Light Therapy sessions', 'Bring a friend to red light therapy'],
          category: 'basic',
          sortOrder: 1
        },
        {
          name: '8 Classes per Month',
          price: 198,
          classesIncluded: 8,
          billingCycle: 'monthly',
          redLightSessions: 3,
          retailDiscount: 5,
          features: ['8 Lagree Fitness classes', '3 free Red Light Therapy sessions', 'Bring a friend to red light therapy', '5% discount on all retail purchases'],
          category: 'premium',
          isPopular: true,
          sortOrder: 2
        },
        {
          name: '12 Classes per Month',
          price: 258,
          classesIncluded: 12,
          billingCycle: 'monthly',
          redLightSessions: 4,
          retailDiscount: 10,
          features: ['12 Lagree Fitness classes', '4 free Red Light Therapy sessions', 'Bring a friend to red light therapy', '10% discount on retail and merchandise'],
          category: 'premium',
          sortOrder: 3
        }
      ];
      
      await MembershipPlan.insertMany(defaultPlans);
      console.log('✅ Default membership plans created');
    }
    
    console.log('✅ Database seeding completed');
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    throw error;
  }
};

// Clean up test data (for development/testing)
const cleanupTestData = async () => {
  try {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Cannot cleanup data in production environment');
    }
    
    console.log('🧹 Cleaning up test data...');
    
    const collections = ['users', 'contactforms', 'classes', 'bookings', 'membershipplans', 'events'];
    
    for (const collection of collections) {
      try {
        await mongoose.connection.db.collection(collection).deleteMany({});
        console.log(`✅ Cleaned collection: ${collection}`);
      } catch (error) {
        console.log(`⚠️  Collection ${collection} does not exist or error: ${error.message}`);
      }
    }
    
    console.log('✅ Test data cleanup completed');
  } catch (error) {
    console.error('❌ Error cleaning up test data:', error.message);
    throw error;
  }
};

module.exports = {
  connectDB,
  checkDatabaseHealth,
  getDatabaseStats,
  initializeIndexes,
  seedDatabase,
  cleanupTestData
};
