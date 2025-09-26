const mongoose = require('mongoose');

const membershipPlanSchema = new mongoose.Schema({
  // Plan Information
  name: {
    type: String,
    required: [true, 'Plan name is required'],
    trim: true,
    maxlength: [100, 'Plan name cannot exceed 100 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  
  // Pricing
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  setupFee: {
    type: Number,
    default: 0,
    min: [0, 'Setup fee cannot be negative']
  },
  currency: {
    type: String,
    default: 'USD',
    enum: ['USD', 'EUR', 'GBP', 'CAD', 'AUD']
  },
  
  // Billing Cycle
  billingCycle: {
    type: String,
    required: [true, 'Billing cycle is required'],
    enum: ['monthly', 'quarterly', 'semi-annually', 'annually', 'one-time']
  },
  billingInterval: {
    type: Number,
    default: 1,
    min: [1, 'Billing interval must be at least 1']
  },
  
  // Class Allocation
  classesIncluded: {
    type: Number,
    required: [true, 'Number of classes included is required'],
    min: [0, 'Classes included cannot be negative']
  },
  isUnlimited: {
    type: Boolean,
    default: false
  },
  rolloverLimit: {
    type: Number, // Max classes that can roll over to next period
    default: 0,
    min: [0, 'Rollover limit cannot be negative']
  },
  expirationDays: {
    type: Number, // Days after which unused classes expire
    default: 30,
    min: [1, 'Expiration days must be at least 1']
  },
  
  // Access & Restrictions
  allowedClassTypes: [{
    type: String,
    enum: [
      'Lagree Fitness',
      'Mindful Movement', 
      'Recovery Flow',
      'Red Light Therapy',
      'Workshop',
      'Private Session'
    ]
  }],
  restrictedClassTypes: [String],
  timeRestrictions: {
    allowedDays: [{
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }],
    allowedTimeSlots: [{
      start: String,
      end: String
    }],
    blackoutDates: [Date]
  },
  
  // Benefits & Features
  features: [String],
  benefits: [{
    type: {
      type: String,
      required: true
    },
    value: String,
    description: String
  }],
  
  // Red Light Therapy
  redLightSessions: {
    type: Number,
    default: 0,
    min: [0, 'Red light sessions cannot be negative']
  },
  guestRedLightPasses: {
    type: Number,
    default: 0,
    min: [0, 'Guest passes cannot be negative']
  },
  
  // Discounts & Perks
  retailDiscount: {
    type: Number,
    default: 0,
    min: [0, 'Retail discount cannot be negative'],
    max: [100, 'Retail discount cannot exceed 100%']
  },
  membershipPerks: [String],
  priorityBooking: {
    type: Boolean,
    default: false
  },
  guestPasses: {
    type: Number,
    default: 0,
    min: [0, 'Guest passes cannot be negative']
  },
  
  // Contract Terms
  minimumCommitment: {
    type: Number, // in months
    default: 0,
    min: [0, 'Minimum commitment cannot be negative']
  },
  cancellationPolicy: {
    noticePeriod: {
      type: Number, // days
      default: 30
    },
    cancellationFee: {
      type: Number,
      default: 0,
      min: [0, 'Cancellation fee cannot be negative']
    },
    terms: String
  },
  freezePolicy: {
    allowFreezing: {
      type: Boolean,
      default: true
    },
    maxFreezeDuration: {
      type: Number, // days
      default: 60
    },
    freezeFee: {
      type: Number,
      default: 0,
      min: [0, 'Freeze fee cannot be negative']
    },
    minFreezeNotice: {
      type: Number, // days
      default: 7
    }
  },
  
  // Plan Status & Availability
  isActive: {
    type: Boolean,
    default: true
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  availableFrom: Date,
  availableUntil: Date,
  maxMembers: {
    type: Number,
    min: [1, 'Max members must be at least 1']
  },
  currentMembers: {
    type: Number,
    default: 0,
    min: [0, 'Current members cannot be negative']
  },
  
  // Trial & Promotion
  trialPeriod: {
    enabled: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number, // days
      default: 7
    },
    trialPrice: {
      type: Number,
      default: 0
    },
    trialClasses: {
      type: Number,
      default: 1
    }
  },
  
  // Special Offers
  promotions: [{
    name: String,
    description: String,
    discountType: {
      type: String,
      enum: ['percentage', 'fixed-amount']
    },
    discountValue: Number,
    validFrom: Date,
    validUntil: Date,
    isActive: {
      type: Boolean,
      default: true
    },
    maxUses: Number,
    currentUses: {
      type: Number,
      default: 0
    }
  }],
  
  // Analytics & Tracking
  popularityScore: {
    type: Number,
    default: 0
  },
  totalSubscriptions: {
    type: Number,
    default: 0
  },
  activeSubscriptions: {
    type: Number,
    default: 0
  },
  averageLifetime: {
    type: Number, // in days
    default: 0
  },
  churnRate: {
    type: Number, // percentage
    default: 0
  },
  
  // Categorization
  category: {
    type: String,
    enum: ['basic', 'premium', 'unlimited', 'trial', 'corporate', 'student'],
    default: 'basic'
  },
  targetAudience: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'all-levels', 'corporate'],
    default: 'all-levels'
  },
  tags: [String],
  
  // Metadata
  sortOrder: {
    type: Number,
    default: 0
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  
  // External Integration
  stripeProductId: String,
  stripePriceId: String,
  
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
membershipPlanSchema.index({ isActive: 1, isPublic: 1 });
membershipPlanSchema.index({ category: 1 });
membershipPlanSchema.index({ price: 1 });
membershipPlanSchema.index({ sortOrder: 1 });
membershipPlanSchema.index({ popularityScore: -1 });

// Virtual for price per class
membershipPlanSchema.virtual('pricePerClass').get(function() {
  if (this.isUnlimited || this.classesIncluded === 0) return 0;
  return this.price / this.classesIncluded;
});

// Virtual for availability status
membershipPlanSchema.virtual('isAvailable').get(function() {
  const now = new Date();
  const availableFrom = this.availableFrom || new Date(0);
  const availableUntil = this.availableUntil || new Date('2099-12-31');
  
  return this.isActive && 
         this.isPublic && 
         now >= availableFrom && 
         now <= availableUntil &&
         (!this.maxMembers || this.currentMembers < this.maxMembers);
});

// Virtual for spots remaining
membershipPlanSchema.virtual('spotsRemaining').get(function() {
  if (!this.maxMembers) return null;
  return Math.max(0, this.maxMembers - this.currentMembers);
});

// Pre-save middleware
membershipPlanSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  // Auto-set unlimited if classes included is very high
  if (this.classesIncluded >= 999) {
    this.isUnlimited = true;
  }
  
  // Ensure allowed class types includes at least one type if not unlimited access
  if (this.allowedClassTypes.length === 0) {
    this.allowedClassTypes = ['Lagree Fitness', 'Mindful Movement', 'Recovery Flow'];
  }
  
  next();
});

// Static method to get active public plans
membershipPlanSchema.statics.getPublicPlans = async function() {
  return await this.find({
    isActive: true,
    isPublic: true,
    $or: [
      { availableFrom: { $lte: new Date() } },
      { availableFrom: { $exists: false } }
    ],
    $or: [
      { availableUntil: { $gte: new Date() } },
      { availableUntil: { $exists: false } }
    ]
  }).sort({ sortOrder: 1, price: 1 });
};

// Static method to get plan statistics
membershipPlanSchema.statics.getStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
        avgPrice: { $avg: '$price' },
        totalMembers: { $sum: '$currentMembers' }
      }
    }
  ]);
  
  const popularPlans = await this.find({ isActive: true })
    .sort({ popularityScore: -1 })
    .limit(5)
    .select('name currentMembers popularityScore');
  
  return { categoryStats: stats, popularPlans };
};

// Instance method to update popularity score
membershipPlanSchema.methods.updatePopularityScore = function() {
  // Simple popularity algorithm based on current members and subscription rate
  const membershipWeight = this.currentMembers * 0.7;
  const subscriptionWeight = this.totalSubscriptions * 0.3;
  
  this.popularityScore = membershipWeight + subscriptionWeight;
  return this.save();
};

// Instance method to check if plan is available for signup
membershipPlanSchema.methods.canSignUp = function() {
  return this.isAvailable && (!this.maxMembers || this.currentMembers < this.maxMembers);
};

// Instance method to add promotion
membershipPlanSchema.methods.addPromotion = function(promotionData) {
  this.promotions.push(promotionData);
  return this.save();
};

// Instance method to get current active promotion
membershipPlanSchema.methods.getCurrentPromotion = function() {
  const now = new Date();
  return this.promotions.find(promo => 
    promo.isActive &&
    promo.validFrom <= now &&
    promo.validUntil >= now &&
    (!promo.maxUses || promo.currentUses < promo.maxUses)
  );
};

// Instance method to calculate discounted price
membershipPlanSchema.methods.getDiscountedPrice = function() {
  const promotion = this.getCurrentPromotion();
  if (!promotion) return this.price;
  
  if (promotion.discountType === 'percentage') {
    return this.price * (1 - promotion.discountValue / 100);
  } else {
    return Math.max(0, this.price - promotion.discountValue);
  }
};

module.exports = mongoose.model('MembershipPlan', membershipPlanSchema);
