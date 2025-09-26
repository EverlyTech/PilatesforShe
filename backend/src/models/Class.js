const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  // Class Information
  name: {
    type: String,
    required: [true, 'Class name is required'],
    trim: true,
    maxlength: [100, 'Class name cannot exceed 100 characters']
  },
  type: {
    type: String,
    required: [true, 'Class type is required'],
    enum: [
      'Lagree Fitness',
      'Mindful Movement',
      'Recovery Flow',
      'Red Light Therapy',
      'Workshop',
      'Private Session',
      'Group Session'
    ]
  },
  description: {
    type: String,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'all-levels'],
    default: 'all-levels'
  },
  
  // Scheduling
  dayOfWeek: {
    type: String,
    required: [true, 'Day of week is required'],
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
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
    required: [true, 'Duration is required'],
    min: [15, 'Duration must be at least 15 minutes'],
    max: [180, 'Duration cannot exceed 180 minutes']
  },
  
  // Instructor & Studio
  instructor: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Instructor is required']
  },
  substituteInstructor: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  room: {
    type: String,
    required: [true, 'Room is required'],
    enum: ['Studio A', 'Studio B', 'Recovery Room', 'Private Room 1', 'Private Room 2']
  },
  
  // Capacity & Booking
  maxCapacity: {
    type: Number,
    required: [true, 'Max capacity is required'],
    min: [1, 'Max capacity must be at least 1'],
    max: [30, 'Max capacity cannot exceed 30']
  },
  waitlistCapacity: {
    type: Number,
    default: 10,
    min: [0, 'Waitlist capacity cannot be negative'],
    max: [20, 'Waitlist capacity cannot exceed 20']
  },
  
  // Pricing
  dropInPrice: {
    type: Number,
    required: [true, 'Drop-in price is required'],
    min: [0, 'Price cannot be negative']
  },
  memberPrice: {
    type: Number,
    default: 0,
    min: [0, 'Member price cannot be negative']
  },
  
  // Class Status & Settings
  isActive: {
    type: Boolean,
    default: true
  },
  isRecurring: {
    type: Boolean,
    default: true
  },
  allowDropIns: {
    type: Boolean,
    default: true
  },
  requiresEquipment: {
    type: Boolean,
    default: false
  },
  equipment: [String],
  
  // Cancellation Policy
  cancellationDeadline: {
    type: Number, // hours before class
    default: 12,
    min: [1, 'Cancellation deadline must be at least 1 hour'],
    max: [48, 'Cancellation deadline cannot exceed 48 hours']
  },
  lateCancellationFee: {
    type: Number,
    default: 0,
    min: [0, 'Late cancellation fee cannot be negative']
  },
  
  // Special Requirements
  prerequisites: [String],
  specialInstructions: String,
  whatToBring: [String],
  
  // Exceptions & Holidays
  exceptions: [{
    date: {
      type: Date,
      required: true
    },
    reason: {
      type: String,
      enum: ['cancelled', 'instructor-change', 'time-change', 'room-change'],
      required: true
    },
    newInstructor: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    newTime: String,
    newRoom: String,
    note: String
  }],
  
  // Statistics
  totalBookings: {
    type: Number,
    default: 0
  },
  averageAttendance: {
    type: Number,
    default: 0
  },
  
  // Tags and Categories
  tags: [String],
  category: {
    type: String,
    enum: ['fitness', 'wellness', 'recovery', 'workshop', 'special-event'],
    default: 'fitness'
  },
  
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
classSchema.index({ dayOfWeek: 1, startTime: 1 });
classSchema.index({ instructor: 1 });
classSchema.index({ type: 1 });
classSchema.index({ isActive: 1 });
classSchema.index({ room: 1, dayOfWeek: 1, startTime: 1 });

// Virtual for current bookings count
classSchema.virtual('currentBookings', {
  ref: 'Booking',
  localField: '_id',
  foreignField: 'class',
  count: true,
  match: { status: 'confirmed' }
});

// Virtual for waitlist count
classSchema.virtual('waitlistCount', {
  ref: 'Booking',
  localField: '_id',
  foreignField: 'class',
  count: true,
  match: { status: 'waitlisted' }
});

// Virtual for available spots
classSchema.virtual('availableSpots').get(function() {
  const currentBookings = this.currentBookings || 0;
  return Math.max(0, this.maxCapacity - currentBookings);
});

// Virtual for next occurrence
classSchema.virtual('nextOccurrence').get(function() {
  const today = new Date();
  const dayMap = {
    'Sunday': 0, 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3,
    'Thursday': 4, 'Friday': 5, 'Saturday': 6
  };
  
  const targetDay = dayMap[this.dayOfWeek];
  const currentDay = today.getDay();
  
  let daysUntilTarget = targetDay - currentDay;
  if (daysUntilTarget <= 0) {
    daysUntilTarget += 7;
  }
  
  const nextDate = new Date(today);
  nextDate.setDate(today.getDate() + daysUntilTarget);
  
  // Set the time
  const [hours, minutes] = this.startTime.split(':');
  nextDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
  
  return nextDate;
});

// Pre-save middleware
classSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  // Calculate duration if not provided
  if (!this.duration && this.startTime && this.endTime) {
    const [startHours, startMinutes] = this.startTime.split(':').map(Number);
    const [endHours, endMinutes] = this.endTime.split(':').map(Number);
    
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;
    
    this.duration = endTotalMinutes - startTotalMinutes;
  }
  
  next();
});

// Static method to get schedule for a specific date range
classSchema.statics.getSchedule = async function(startDate, endDate) {
  return await this.find({
    isActive: true
  }).populate('instructor', 'firstName lastName').sort({ dayOfWeek: 1, startTime: 1 });
};

// Static method to get class statistics
classSchema.statics.getStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: '$type',
        count: { $sum: 1 },
        avgCapacity: { $avg: '$maxCapacity' },
        totalBookings: { $sum: '$totalBookings' }
      }
    }
  ]);
  
  return stats;
};

// Instance method to check if class is full
classSchema.methods.isFull = function() {
  return this.currentBookings >= this.maxCapacity;
};

// Instance method to check if waitlist is full
classSchema.methods.isWaitlistFull = function() {
  return this.waitlistCount >= this.waitlistCapacity;
};

// Instance method to add exception
classSchema.methods.addException = function(date, reason, details = {}) {
  this.exceptions.push({
    date,
    reason,
    ...details
  });
  return this.save();
};

module.exports = mongoose.model('Class', classSchema);
