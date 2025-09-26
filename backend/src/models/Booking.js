const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  // User & Class Information
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'User is required for booking']
  },
  class: {
    type: mongoose.Schema.ObjectId,
    ref: 'Class',
    required: [true, 'Class is required for booking']
  },
  
  // Booking Details
  bookingDate: {
    type: Date,
    required: [true, 'Booking date is required']
  },
  bookingType: {
    type: String,
    enum: ['single', 'package', 'membership', 'trial', 'complimentary'],
    required: [true, 'Booking type is required']
  },
  
  // Status Management
  status: {
    type: String,
    enum: [
      'confirmed',
      'waitlisted', 
      'cancelled',
      'no-show',
      'completed',
      'late-cancelled'
    ],
    default: 'confirmed'
  },
  position: {
    type: Number, // Position in class or waitlist
    min: [1, 'Position must be at least 1']
  },
  
  // Payment Information
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded', 'failed', 'waived'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['membership', 'package', 'credit-card', 'cash', 'gift-card', 'complimentary']
  },
  amountPaid: {
    type: Number,
    min: [0, 'Amount paid cannot be negative'],
    default: 0
  },
  paymentTransactionId: String,
  
  // Package/Membership Usage
  packageUsed: {
    type: mongoose.Schema.ObjectId,
    ref: 'Package'
  },
  membershipUsed: {
    type: mongoose.Schema.ObjectId,
    ref: 'MembershipPlan'
  },
  creditsUsed: {
    type: Number,
    default: 1,
    min: [0, 'Credits used cannot be negative']
  },
  
  // Booking Source & Method
  bookingSource: {
    type: String,
    enum: ['website', 'app', 'phone', 'in-person', 'admin'],
    default: 'website'
  },
  bookedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User' // For admin bookings
  },
  
  // Timing Information
  bookedAt: {
    type: Date,
    default: Date.now
  },
  checkedInAt: Date,
  cancelledAt: Date,
  completedAt: Date,
  
  // Cancellation Details
  cancellationReason: {
    type: String,
    enum: [
      'user-request',
      'class-cancelled',
      'instructor-unavailable',
      'facility-issue',
      'weather',
      'emergency',
      'no-show',
      'late-cancellation',
      'system-error'
    ]
  },
  cancellationNote: String,
  refundAmount: {
    type: Number,
    min: [0, 'Refund amount cannot be negative'],
    default: 0
  },
  lateCancellationFee: {
    type: Number,
    min: [0, 'Late cancellation fee cannot be negative'],
    default: 0
  },
  
  // Waitlist Management
  waitlistPosition: Number,
  waitlistAddedAt: Date,
  waitlistPromotedAt: Date,
  notificationsSent: [{
    type: {
      type: String,
      enum: ['confirmation', 'reminder', 'cancellation', 'waitlist-promotion', 'check-in']
    },
    sentAt: {
      type: Date,
      default: Date.now
    },
    method: {
      type: String,
      enum: ['email', 'sms', 'push', 'in-app']
    }
  }],
  
  // Special Requirements & Notes
  specialRequests: String,
  equipmentNeeds: [String],
  healthConditions: [String],
  isFirstTime: {
    type: Boolean,
    default: false
  },
  
  // Check-in Information
  checkedIn: {
    type: Boolean,
    default: false
  },
  checkInMethod: {
    type: String,
    enum: ['self-service', 'staff', 'instructor', 'automatic']
  },
  lateArrival: {
    type: Boolean,
    default: false
  },
  minutesLate: {
    type: Number,
    min: [0, 'Minutes late cannot be negative']
  },
  
  // Experience & Feedback
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  feedback: String,
  instructorRating: {
    type: Number,
    min: [1, 'Instructor rating must be at least 1'],
    max: [5, 'Instructor rating cannot exceed 5']
  },
  wouldRecommend: Boolean,
  
  // Administrative
  adminNotes: String,
  tags: [String],
  
  // Tracking
  ipAddress: String,
  userAgent: String,
  
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
bookingSchema.index({ user: 1, bookingDate: -1 });
bookingSchema.index({ class: 1, status: 1 });
bookingSchema.index({ bookingDate: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ paymentStatus: 1 });
bookingSchema.index({ waitlistPosition: 1 });

// Compound indexes
bookingSchema.index({ class: 1, bookingDate: 1, status: 1 });
bookingSchema.index({ user: 1, status: 1, bookingDate: -1 });

// Virtual for time until class
bookingSchema.virtual('timeUntilClass').get(function() {
  if (!this.bookingDate) return null;
  return this.bookingDate - Date.now();
});

// Virtual for can cancel
bookingSchema.virtual('canCancel').get(function() {
  if (!this.populate('class').class) return false;
  
  const cancellationDeadline = this.class.cancellationDeadline || 12; // hours
  const deadlineTime = this.bookingDate - (cancellationDeadline * 60 * 60 * 1000);
  
  return Date.now() < deadlineTime && ['confirmed', 'waitlisted'].includes(this.status);
});

// Virtual for is late cancellation
bookingSchema.virtual('isLateCancellation').get(function() {
  if (!this.cancelledAt || !this.populate('class').class) return false;
  
  const cancellationDeadline = this.class.cancellationDeadline || 12; // hours
  const deadlineTime = this.bookingDate - (cancellationDeadline * 60 * 60 * 1000);
  
  return this.cancelledAt > deadlineTime;
});

// Pre-save middleware
bookingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  // Set completion time when status changes to completed
  if (this.isModified('status') && this.status === 'completed' && !this.completedAt) {
    this.completedAt = Date.now();
  }
  
  // Set cancellation time when status changes to cancelled
  if (this.isModified('status') && 
      ['cancelled', 'late-cancelled'].includes(this.status) && 
      !this.cancelledAt) {
    this.cancelledAt = Date.now();
  }
  
  // Set check-in time when checked in
  if (this.isModified('checkedIn') && this.checkedIn && !this.checkedInAt) {
    this.checkedInAt = Date.now();
  }
  
  next();
});

// Static method to get user's booking history
bookingSchema.statics.getUserBookingHistory = async function(userId, limit = 20) {
  return await this.find({ user: userId })
    .populate('class', 'name type startTime dayOfWeek')
    .sort({ bookingDate: -1 })
    .limit(limit);
};

// Static method to get class bookings for a specific date
bookingSchema.statics.getClassBookings = async function(classId, date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  
  return await this.find({
    class: classId,
    bookingDate: { $gte: startOfDay, $lte: endOfDay }
  }).populate('user', 'firstName lastName email phone');
};

// Static method to get booking statistics
bookingSchema.statics.getStats = async function(startDate, endDate) {
  const matchStage = {};
  if (startDate || endDate) {
    matchStage.bookingDate = {};
    if (startDate) matchStage.bookingDate.$gte = new Date(startDate);
    if (endDate) matchStage.bookingDate.$lte = new Date(endDate);
  }
  
  const stats = await this.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        totalRevenue: { $sum: '$amountPaid' }
      }
    }
  ]);
  
  const classTypeStats = await this.aggregate([
    { $match: matchStage },
    {
      $lookup: {
        from: 'classes',
        localField: 'class',
        foreignField: '_id',
        as: 'classInfo'
      }
    },
    { $unwind: '$classInfo' },
    {
      $group: {
        _id: '$classInfo.type',
        count: { $sum: 1 }
      }
    }
  ]);
  
  return { statusStats: stats, classTypeStats };
};

// Instance method to cancel booking
bookingSchema.methods.cancelBooking = function(reason, note) {
  this.status = 'cancelled';
  this.cancellationReason = reason;
  this.cancellationNote = note;
  this.cancelledAt = Date.now();
  
  return this.save();
};

// Instance method to check in
bookingSchema.methods.checkIn = function(method = 'self-service') {
  this.checkedIn = true;
  this.checkedInAt = Date.now();
  this.checkInMethod = method;
  this.status = 'confirmed';
  
  return this.save();
};

// Instance method to complete booking
bookingSchema.methods.complete = function() {
  this.status = 'completed';
  this.completedAt = Date.now();
  
  return this.save();
};

// Instance method to promote from waitlist
bookingSchema.methods.promoteFromWaitlist = function() {
  this.status = 'confirmed';
  this.waitlistPromotedAt = Date.now();
  this.waitlistPosition = undefined;
  
  return this.save();
};

// Instance method to add notification
bookingSchema.methods.addNotification = function(type, method) {
  this.notificationsSent.push({
    type,
    method,
    sentAt: Date.now()
  });
  
  return this.save();
};

module.exports = mongoose.model('Booking', bookingSchema);
