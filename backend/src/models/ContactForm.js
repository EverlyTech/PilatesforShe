const mongoose = require('mongoose');

const contactFormSchema = new mongoose.Schema({
  // Contact Information
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email'
    ]
  },
  phone: {
    type: String,
    match: [/^\+?[\d\s-()]+$/, 'Please enter a valid phone number']
  },
  
  // Message Details
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    enum: [
      'general',
      'membership',
      'classes',
      'events',
      'billing',
      'technical',
      'feedback',
      'other'
    ],
    default: 'general'
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  
  // Status & Processing
  status: {
    type: String,
    enum: ['new', 'in-progress', 'resolved', 'closed'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  assignedTo: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  
  // Response Information
  response: {
    message: String,
    respondedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    respondedAt: Date
  },
  
  // Source Information
  source: {
    type: String,
    enum: ['website', 'email', 'phone', 'in-person', 'social-media'],
    default: 'website'
  },
  ipAddress: String,
  userAgent: String,
  
  // Follow-up
  followUpRequired: {
    type: Boolean,
    default: false
  },
  followUpDate: Date,
  
  // Tags and Categories
  tags: [String],
  category: {
    type: String,
    enum: [
      'inquiry',
      'complaint',
      'compliment',
      'suggestion',
      'support',
      'booking-issue',
      'technical-issue',
      'membership-question'
    ]
  },
  
  // Internal Notes
  internalNotes: [{
    note: String,
    addedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Related Records
  relatedUser: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  relatedBooking: {
    type: mongoose.Schema.ObjectId,
    ref: 'Booking'
  },
  
  // Timestamps
  submittedAt: {
    type: Date,
    default: Date.now
  },
  resolvedAt: Date,
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
contactFormSchema.index({ email: 1 });
contactFormSchema.index({ status: 1 });
contactFormSchema.index({ subject: 1 });
contactFormSchema.index({ submittedAt: -1 });
contactFormSchema.index({ priority: 1, status: 1 });

// Virtual for response time
contactFormSchema.virtual('responseTime').get(function() {
  if (!this.response.respondedAt) return null;
  return this.response.respondedAt - this.submittedAt;
});

// Virtual for time since submission
contactFormSchema.virtual('timeSinceSubmission').get(function() {
  return Date.now() - this.submittedAt;
});

// Pre-save middleware to update timestamps
contactFormSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  // Set resolved date when status changes to resolved
  if (this.isModified('status') && this.status === 'resolved' && !this.resolvedAt) {
    this.resolvedAt = Date.now();
  }
  
  next();
});

// Static method to get contact form statistics
contactFormSchema.statics.getStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);
  
  const subjectStats = await this.aggregate([
    {
      $group: {
        _id: '$subject',
        count: { $sum: 1 }
      }
    }
  ]);
  
  const avgResponseTime = await this.aggregate([
    {
      $match: {
        'response.respondedAt': { $exists: true }
      }
    },
    {
      $group: {
        _id: null,
        avgResponseTime: {
          $avg: {
            $subtract: ['$response.respondedAt', '$submittedAt']
          }
        }
      }
    }
  ]);
  
  return {
    statusStats: stats,
    subjectStats,
    avgResponseTime: avgResponseTime[0]?.avgResponseTime || 0
  };
};

// Instance method to add internal note
contactFormSchema.methods.addInternalNote = function(note, userId) {
  this.internalNotes.push({
    note,
    addedBy: userId,
    addedAt: new Date()
  });
  return this.save();
};

// Instance method to assign to user
contactFormSchema.methods.assignTo = function(userId) {
  this.assignedTo = userId;
  this.status = 'in-progress';
  return this.save();
};

// Instance method to add response
contactFormSchema.methods.addResponse = function(message, userId) {
  this.response = {
    message,
    respondedBy: userId,
    respondedAt: new Date()
  };
  this.status = 'resolved';
  return this.save();
};

module.exports = mongoose.model('ContactForm', contactFormSchema);
