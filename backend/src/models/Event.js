const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  // Event Information
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true,
    maxlength: [150, 'Event title cannot exceed 150 characters']
  },
  description: {
    type: String,
    required: [true, 'Event description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  summary: {
    type: String,
    maxlength: [300, 'Summary cannot exceed 300 characters']
  },
  
  // Event Type & Category
  eventType: {
    type: String,
    required: [true, 'Event type is required'],
    enum: [
      'workshop',
      'retreat',
      'masterclass',
      'community-gathering',
      'wellness-event',
      'training',
      'special-class',
      'social-event',
      'fundraiser'
    ]
  },
  category: {
    type: String,
    enum: [
      'fitness',
      'wellness',
      'education',
      'community',
      'special',
      'seasonal'
    ],
    default: 'wellness'
  },
  
  // Scheduling
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  startTime: {
    type: String,
    required: [true, 'Start time is required'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time in HH:MM format']
  },
  endTime: {
    type: String,
    required: [true, 'End time is required'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time in HH:MM format']
  },
  duration: {
    type: Number, // in minutes
    min: [15, 'Duration must be at least 15 minutes']
  },
  timezone: {
    type: String,
    default: 'America/Los_Angeles'
  },
  
  // Location
  location: {
    type: {
      type: String,
      enum: ['in-studio', 'outdoor', 'virtual', 'offsite'],
      default: 'in-studio'
    },
    venue: String,
    room: String,
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: {
        type: String,
        default: 'United States'
      }
    },
    virtualLink: String,
    instructions: String
  },
  
  // Instructor & Staff
  instructors: [{
    instructor: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    role: {
      type: String,
      enum: ['lead', 'assistant', 'guest', 'co-instructor'],
      default: 'lead'
    },
    bio: String
  }],
  organizer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  
  // Capacity & Registration
  maxCapacity: {
    type: Number,
    required: [true, 'Max capacity is required'],
    min: [1, 'Max capacity must be at least 1']
  },
  minCapacity: {
    type: Number,
    default: 1,
    min: [1, 'Min capacity must be at least 1']
  },
  waitlistCapacity: {
    type: Number,
    default: 10,
    min: [0, 'Waitlist capacity cannot be negative']
  },
  currentRegistrations: {
    type: Number,
    default: 0,
    min: [0, 'Current registrations cannot be negative']
  },
  
  // Pricing
  pricing: {
    type: {
      type: String,
      enum: ['free', 'paid', 'member-only', 'donation'],
      default: 'paid'
    },
    amount: {
      type: Number,
      min: [0, 'Price cannot be negative'],
      default: 0
    },
    memberPrice: {
      type: Number,
      min: [0, 'Member price cannot be negative']
    },
    earlyBirdPrice: {
      type: Number,
      min: [0, 'Early bird price cannot be negative']
    },
    earlyBirdDeadline: Date,
    currency: {
      type: String,
      default: 'USD'
    }
  },
  
  // Registration Settings
  registrationSettings: {
    opensAt: Date,
    closesAt: Date,
    requiresApproval: {
      type: Boolean,
      default: false
    },
    allowWaitlist: {
      type: Boolean,
      default: true
    },
    cancellationDeadline: {
      type: Number, // hours before event
      default: 24
    },
    refundPolicy: String
  },
  
  // Requirements & Prerequisites
  requirements: {
    fitnessLevel: {
      type: String,
      enum: ['any', 'beginner', 'intermediate', 'advanced'],
      default: 'any'
    },
    prerequisites: [String],
    ageRestriction: {
      minAge: {
        type: Number,
        min: [0, 'Minimum age cannot be negative']
      },
      maxAge: {
        type: Number,
        min: [0, 'Maximum age cannot be negative']
      }
    },
    healthRequirements: [String],
    equipmentNeeded: [String],
    whatToBring: [String]
  },
  
  // Content & Materials
  materials: {
    includedItems: [String],
    handouts: [{
      title: String,
      url: String,
      type: {
        type: String,
        enum: ['pdf', 'video', 'audio', 'link']
      }
    }],
    resources: [{
      title: String,
      description: String,
      url: String
    }]
  },
  
  // Media
  images: [{
    url: String,
    alt: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  videos: [{
    url: String,
    title: String,
    description: String
  }],
  
  // Status & Publishing
  status: {
    type: String,
    enum: [
      'draft',
      'published',
      'cancelled',
      'postponed', 
      'completed',
      'full',
      'registration-closed'
    ],
    default: 'draft'
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  
  // Special Features
  isRecurring: {
    type: Boolean,
    default: false
  },
  recurringPattern: {
    frequency: {
      type: String,
      enum: ['weekly', 'biweekly', 'monthly', 'custom']
    },
    interval: Number,
    endDate: Date,
    daysOfWeek: [Number] // 0 = Sunday, 1 = Monday, etc.
  },
  
  // Notifications & Reminders
  notifications: {
    sendReminders: {
      type: Boolean,
      default: true
    },
    reminderSchedule: [{
      timeBeforeEvent: Number, // in hours
      message: String
    }],
    confirmationEmail: {
      enabled: {
        type: Boolean,
        default: true
      },
      template: String,
      customMessage: String
    }
  },
  
  // Analytics & Tracking
  analytics: {
    views: {
      type: Number,
      default: 0
    },
    registrationClicks: {
      type: Number,
      default: 0
    },
    conversionRate: {
      type: Number,
      default: 0
    },
    attendanceRate: {
      type: Number,
      default: 0
    }
  },
  
  // Tags & SEO
  tags: [String],
  seoData: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  
  // External Integration
  externalEventId: String,
  calendarLinks: {
    google: String,
    outlook: String,
    ical: String
  },
  
  // Feedback & Reviews
  allowReviews: {
    type: Boolean,
    default: true
  },
  reviews: [{
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5']
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  averageRating: {
    type: Number,
    default: 0
  },
  
  // Administrative
  adminNotes: String,
  cancellationReason: String,
  postponementReason: String,
  newEventDate: Date,
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
eventSchema.index({ startDate: 1 });
eventSchema.index({ eventType: 1, status: 1 });
eventSchema.index({ status: 1, isPublic: 1 });
eventSchema.index({ isFeatured: 1, startDate: 1 });
eventSchema.index({ 'location.type': 1 });

// Virtual for available spots
eventSchema.virtual('availableSpots').get(function() {
  return Math.max(0, this.maxCapacity - this.currentRegistrations);
});

// Virtual for is full
eventSchema.virtual('isFull').get(function() {
  return this.currentRegistrations >= this.maxCapacity;
});

// Virtual for registration status
eventSchema.virtual('registrationStatus').get(function() {
  const now = new Date();
  
  if (this.registrationSettings.opensAt && now < this.registrationSettings.opensAt) {
    return 'not-open';
  }
  
  if (this.registrationSettings.closesAt && now > this.registrationSettings.closesAt) {
    return 'closed';
  }
  
  if (this.isFull && !this.registrationSettings.allowWaitlist) {
    return 'full';
  }
  
  if (this.isFull && this.registrationSettings.allowWaitlist) {
    return 'waitlist';
  }
  
  return 'open';
});

// Virtual for current price
eventSchema.virtual('currentPrice').get(function() {
  if (this.pricing.type === 'free') return 0;
  
  const now = new Date();
  if (this.pricing.earlyBirdPrice && 
      this.pricing.earlyBirdDeadline && 
      now <= this.pricing.earlyBirdDeadline) {
    return this.pricing.earlyBirdPrice;
  }
  
  return this.pricing.amount;
});

// Virtual for is past
eventSchema.virtual('isPast').get(function() {
  return this.endDate < new Date();
});

// Virtual for is today
eventSchema.virtual('isToday').get(function() {
  const today = new Date();
  const eventDate = new Date(this.startDate);
  
  return today.toDateString() === eventDate.toDateString();
});

// Pre-save middleware
eventSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  // Calculate duration if not provided
  if (!this.duration && this.startTime && this.endTime) {
    const [startHours, startMinutes] = this.startTime.split(':').map(Number);
    const [endHours, endMinutes] = this.endTime.split(':').map(Number);
    
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;
    
    this.duration = endTotalMinutes - startTotalMinutes;
  }
  
  // Update average rating
  if (this.reviews.length > 0) {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.averageRating = totalRating / this.reviews.length;
  }
  
  next();
});

// Static method to get upcoming events
eventSchema.statics.getUpcomingEvents = async function(limit = 10) {
  return await this.find({
    status: 'published',
    isPublic: true,
    startDate: { $gte: new Date() }
  })
  .populate('instructors.instructor', 'firstName lastName')
  .sort({ startDate: 1 })
  .limit(limit);
};

// Static method to get featured events
eventSchema.statics.getFeaturedEvents = async function() {
  return await this.find({
    status: 'published',
    isPublic: true,
    isFeatured: true,
    startDate: { $gte: new Date() }
  })
  .populate('instructors.instructor', 'firstName lastName')
  .sort({ startDate: 1 });
};

// Static method to get events by type
eventSchema.statics.getEventsByType = async function(eventType) {
  return await this.find({
    eventType,
    status: 'published',
    isPublic: true,
    startDate: { $gte: new Date() }
  })
  .populate('instructors.instructor', 'firstName lastName')
  .sort({ startDate: 1 });
};

// Instance method to register user
eventSchema.methods.registerUser = function(userId) {
  if (this.isFull) {
    throw new Error('Event is full');
  }
  
  this.currentRegistrations += 1;
  return this.save();
};

// Instance method to cancel registration
eventSchema.methods.cancelRegistration = function(userId) {
  this.currentRegistrations = Math.max(0, this.currentRegistrations - 1);
  return this.save();
};

// Instance method to add review
eventSchema.methods.addReview = function(userId, rating, comment) {
  this.reviews.push({
    user: userId,
    rating,
    comment,
    createdAt: new Date()
  });
  
  return this.save();
};

// Instance method to update view count
eventSchema.methods.incrementViews = function() {
  this.analytics.views += 1;
  return this.save();
};

module.exports = mongoose.model('Event', eventSchema);
