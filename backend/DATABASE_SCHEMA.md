# Pilates for She - Database Schema Documentation

## 🗄️ **Database Overview**

**Database Type**: MongoDB (NoSQL)  
**ODM**: Mongoose  
**Security**: Encrypted connections, input sanitization, authentication  
**Scalability**: Indexed collections, connection pooling, optimized queries  

---

## 📊 **Complete Database Schema**

### **1. Users Collection**
**Purpose**: Store user accounts, authentication, and profile information

```javascript
{
  // Personal Information
  firstName: String (required, max 50 chars)
  lastName: String (required, max 50 chars)
  email: String (required, unique, validated)
  phone: String (optional, validated format)
  dateOfBirth: Date (optional, must be past)
  
  // Authentication & Security
  password: String (required, min 8 chars, hashed, not selected by default)
  role: String (enum: member, instructor, admin) [default: member]
  isActive: Boolean [default: true]
  emailVerified: Boolean [default: false]
  emailVerificationToken: String (optional)
  emailVerificationExpires: Date (optional)
  passwordResetToken: String (optional)
  passwordResetExpires: Date (optional)
  
  // Membership Information
  membershipStatus: String (enum: active, inactive, suspended, cancelled) [default: inactive]
  membershipPlan: ObjectId (ref: MembershipPlan)
  membershipStartDate: Date (optional)
  membershipEndDate: Date (optional)
  classesRemaining: Number [default: 0]
  
  // Emergency Contact
  emergencyContact: {
    name: String
    phone: String
    relationship: String
  }
  
  // Health & Fitness
  healthConditions: [String]
  fitnessLevel: String (enum: beginner, intermediate, advanced)
  injuries: [String]
  goals: [String]
  
  // Preferences
  preferences: {
    classTypes: [String]
    instructors: [ObjectId] (ref: User)
    timeSlots: [String]
    emailNotifications: Boolean [default: true]
    smsNotifications: Boolean [default: false]
  }
  
  // Profile
  profileImage: String (URL)
  bio: String
  
  // Instructor-specific
  instructorInfo: {
    certifications: [String]
    specialties: [String]
    experience: String
    bio: String
    hourlyRate: Number
  }
  
  // Tracking
  lastLogin: Date
  loginCount: Number [default: 0]
  createdAt: Date [default: now]
  updatedAt: Date [default: now]
}
```

**Indexes**: email, membershipStatus, role, createdAt  
**Security**: Password hashing (bcrypt), JWT tokens, email verification

---

### **2. ContactForms Collection**
**Purpose**: Store and manage contact form submissions

```javascript
{
  // Contact Information
  name: String (required, max 100 chars)
  email: String (required, validated)
  phone: String (optional, validated)
  
  // Message Details
  subject: String (required, enum: general, membership, classes, events, billing, technical, feedback, other)
  message: String (required, max 2000 chars)
  
  // Status & Processing
  status: String (enum: new, in-progress, resolved, closed) [default: new]
  priority: String (enum: low, medium, high, urgent) [default: medium]
  assignedTo: ObjectId (ref: User) (optional)
  
  // Response Information
  response: {
    message: String
    respondedBy: ObjectId (ref: User)
    respondedAt: Date
  }
  
  // Source & Tracking
  source: String (enum: website, email, phone, in-person, social-media) [default: website]
  ipAddress: String
  userAgent: String
  
  // Follow-up
  followUpRequired: Boolean [default: false]
  followUpDate: Date (optional)
  
  // Categorization
  tags: [String]
  category: String (enum: inquiry, complaint, compliment, suggestion, support, booking-issue, technical-issue, membership-question)
  
  // Internal Management
  internalNotes: [{
    note: String
    addedBy: ObjectId (ref: User)
    addedAt: Date [default: now]
  }]
  
  // Related Records
  relatedUser: ObjectId (ref: User) (optional)
  relatedBooking: ObjectId (ref: Booking) (optional)
  
  // Timestamps
  submittedAt: Date [default: now]
  resolvedAt: Date (optional)
  createdAt: Date [default: now]
  updatedAt: Date [default: now]
}
```

**Indexes**: email, status, subject, submittedAt, priority+status  
**Features**: Auto-assignment, response tracking, analytics

---

### **3. Classes Collection**
**Purpose**: Define recurring class schedules and templates

```javascript
{
  // Class Information
  name: String (required, max 100 chars)
  type: String (required, enum: Lagree Fitness, Mindful Movement, Recovery Flow, Red Light Therapy, Workshop, Private Session, Group Session)
  description: String (max 1000 chars)
  level: String (enum: beginner, intermediate, advanced, all-levels) [default: all-levels]
  
  // Scheduling
  dayOfWeek: String (required, enum: Monday-Sunday)
  startTime: String (required, HH:MM format)
  endTime: String (required, HH:MM format)
  duration: Number (minutes, min 15, max 180)
  
  // Instructor & Location
  instructor: ObjectId (required, ref: User)
  substituteInstructor: ObjectId (ref: User) (optional)
  room: String (required, enum: Studio A, Studio B, Recovery Room, Private Room 1, Private Room 2)
  
  // Capacity & Booking
  maxCapacity: Number (required, min 1, max 30)
  waitlistCapacity: Number [default: 10, min 0, max 20]
  
  // Pricing
  dropInPrice: Number (required, min 0)
  memberPrice: Number [default: 0, min 0]
  
  // Settings
  isActive: Boolean [default: true]
  isRecurring: Boolean [default: true]
  allowDropIns: Boolean [default: true]
  requiresEquipment: Boolean [default: false]
  equipment: [String]
  
  // Policies
  cancellationDeadline: Number (hours, default 12, min 1, max 48)
  lateCancellationFee: Number [default: 0, min 0]
  
  // Requirements
  prerequisites: [String]
  specialInstructions: String
  whatToBring: [String]
  
  // Exceptions & Holidays
  exceptions: [{
    date: Date (required)
    reason: String (required, enum: cancelled, instructor-change, time-change, room-change)
    newInstructor: ObjectId (ref: User) (optional)
    newTime: String (optional)
    newRoom: String (optional)
    note: String (optional)
  }]
  
  // Statistics
  totalBookings: Number [default: 0]
  averageAttendance: Number [default: 0]
  
  // Categorization
  tags: [String]
  category: String (enum: fitness, wellness, recovery, workshop, special-event) [default: fitness]
  
  // Timestamps
  createdAt: Date [default: now]
  updatedAt: Date [default: now]
}
```

**Indexes**: dayOfWeek+startTime, instructor, type, isActive, room+dayOfWeek+startTime  
**Virtual Fields**: currentBookings, waitlistCount, availableSpots, nextOccurrence

---

### **4. Bookings Collection**
**Purpose**: Track individual class bookings and reservations

```javascript
{
  // Core Booking Info
  user: ObjectId (required, ref: User)
  class: ObjectId (required, ref: Class)
  bookingDate: Date (required)
  bookingType: String (required, enum: single, package, membership, trial, complimentary)
  
  // Status Management
  status: String (enum: confirmed, waitlisted, cancelled, no-show, completed, late-cancelled) [default: confirmed]
  position: Number (min 1) - position in class or waitlist
  
  // Payment Information
  paymentStatus: String (enum: pending, paid, refunded, failed, waived) [default: pending]
  paymentMethod: String (enum: membership, package, credit-card, cash, gift-card, complimentary)
  amountPaid: Number [default: 0, min 0]
  paymentTransactionId: String
  
  // Usage Tracking
  packageUsed: ObjectId (ref: Package) (optional)
  membershipUsed: ObjectId (ref: MembershipPlan) (optional)
  creditsUsed: Number [default: 1, min 0]
  
  // Booking Source
  bookingSource: String (enum: website, app, phone, in-person, admin) [default: website]
  bookedBy: ObjectId (ref: User) (optional) - for admin bookings
  
  // Timing
  bookedAt: Date [default: now]
  checkedInAt: Date (optional)
  cancelledAt: Date (optional)
  completedAt: Date (optional)
  
  // Cancellation Details
  cancellationReason: String (enum: user-request, class-cancelled, instructor-unavailable, facility-issue, weather, emergency, no-show, late-cancellation, system-error)
  cancellationNote: String
  refundAmount: Number [default: 0, min 0]
  lateCancellationFee: Number [default: 0, min 0]
  
  // Waitlist Management
  waitlistPosition: Number (optional)
  waitlistAddedAt: Date (optional)
  waitlistPromotedAt: Date (optional)
  
  // Notifications
  notificationsSent: [{
    type: String (enum: confirmation, reminder, cancellation, waitlist-promotion, check-in)
    sentAt: Date [default: now]
    method: String (enum: email, sms, push, in-app)
  }]
  
  // Special Requirements
  specialRequests: String
  equipmentNeeds: [String]
  healthConditions: [String]
  isFirstTime: Boolean [default: false]
  
  // Check-in
  checkedIn: Boolean [default: false]
  checkInMethod: String (enum: self-service, staff, instructor, automatic)
  lateArrival: Boolean [default: false]
  minutesLate: Number [min 0]
  
  // Feedback
  rating: Number (min 1, max 5)
  feedback: String
  instructorRating: Number (min 1, max 5)
  wouldRecommend: Boolean
  
  // Administrative
  adminNotes: String
  tags: [String]
  ipAddress: String
  userAgent: String
  
  // Timestamps
  createdAt: Date [default: now]
  updatedAt: Date [default: now]
}
```

**Indexes**: user+bookingDate, class+status, bookingDate, status, paymentStatus, waitlistPosition  
**Virtual Fields**: timeUntilClass, canCancel, isLateCancellation

---

### **5. MembershipPlans Collection**
**Purpose**: Define membership packages and pricing

```javascript
{
  // Plan Information
  name: String (required, max 100 chars)
  description: String (max 500 chars)
  
  // Pricing
  price: Number (required, min 0)
  setupFee: Number [default: 0, min 0]
  currency: String [default: USD, enum: USD, EUR, GBP, CAD, AUD]
  
  // Billing
  billingCycle: String (required, enum: monthly, quarterly, semi-annually, annually, one-time)
  billingInterval: Number [default: 1, min 1]
  
  // Class Allocation
  classesIncluded: Number (required, min 0)
  isUnlimited: Boolean [default: false]
  rolloverLimit: Number [default: 0, min 0] - max classes that roll over
  expirationDays: Number [default: 30, min 1] - days until unused classes expire
  
  // Access Control
  allowedClassTypes: [String] (enum: Lagree Fitness, Mindful Movement, Recovery Flow, Red Light Therapy, Workshop, Private Session)
  restrictedClassTypes: [String]
  timeRestrictions: {
    allowedDays: [String] (enum: Monday-Sunday)
    allowedTimeSlots: [{
      start: String
      end: String
    }]
    blackoutDates: [Date]
  }
  
  // Benefits
  features: [String]
  benefits: [{
    type: String (required)
    value: String
    description: String
  }]
  
  // Red Light Therapy
  redLightSessions: Number [default: 0, min 0]
  guestRedLightPasses: Number [default: 0, min 0]
  
  // Perks
  retailDiscount: Number [default: 0, min 0, max 100] - percentage
  membershipPerks: [String]
  priorityBooking: Boolean [default: false]
  guestPasses: Number [default: 0, min 0]
  
  // Contract Terms
  minimumCommitment: Number [default: 0, min 0] - months
  cancellationPolicy: {
    noticePeriod: Number [default: 30] - days
    cancellationFee: Number [default: 0, min 0]
    terms: String
  }
  freezePolicy: {
    allowFreezing: Boolean [default: true]
    maxFreezeDuration: Number [default: 60] - days
    freezeFee: Number [default: 0, min 0]
    minFreezeNotice: Number [default: 7] - days
  }
  
  // Availability
  isActive: Boolean [default: true]
  isPublic: Boolean [default: true]
  availableFrom: Date (optional)
  availableUntil: Date (optional)
  maxMembers: Number (optional, min 1)
  currentMembers: Number [default: 0, min 0]
  
  // Trial
  trialPeriod: {
    enabled: Boolean [default: false]
    duration: Number [default: 7] - days
    trialPrice: Number [default: 0]
    trialClasses: Number [default: 1]
  }
  
  // Promotions
  promotions: [{
    name: String
    description: String
    discountType: String (enum: percentage, fixed-amount)
    discountValue: Number
    validFrom: Date
    validUntil: Date
    isActive: Boolean [default: true]
    maxUses: Number (optional)
    currentUses: Number [default: 0]
  }]
  
  // Analytics
  popularityScore: Number [default: 0]
  totalSubscriptions: Number [default: 0]
  activeSubscriptions: Number [default: 0]
  averageLifetime: Number [default: 0] - days
  churnRate: Number [default: 0] - percentage
  
  // Categorization
  category: String (enum: basic, premium, unlimited, trial, corporate, student) [default: basic]
  targetAudience: String (enum: beginner, intermediate, advanced, all-levels, corporate) [default: all-levels]
  tags: [String]
  
  // Display
  sortOrder: Number [default: 0]
  isPopular: Boolean [default: false]
  isFeatured: Boolean [default: false]
  
  // External Integration
  stripeProductId: String
  stripePriceId: String
  
  // Timestamps
  createdAt: Date [default: now]
  updatedAt: Date [default: now]
}
```

**Indexes**: isActive+isPublic, category, price, sortOrder, popularityScore  
**Virtual Fields**: pricePerClass, isAvailable, spotsRemaining

---

### **6. Events Collection**
**Purpose**: Manage special events, workshops, and gatherings

```javascript
{
  // Event Information
  title: String (required, max 150 chars)
  description: String (required, max 2000 chars)
  summary: String (max 300 chars)
  
  // Type & Category
  eventType: String (required, enum: workshop, retreat, masterclass, community-gathering, wellness-event, training, special-class, social-event, fundraiser)
  category: String (enum: fitness, wellness, education, community, special, seasonal) [default: wellness]
  
  // Scheduling
  startDate: Date (required)
  endDate: Date (required)
  startTime: String (required, HH:MM format)
  endTime: String (required, HH:MM format)
  duration: Number (minutes, min 15)
  timezone: String [default: America/Los_Angeles]
  
  // Location
  location: {
    type: String (enum: in-studio, outdoor, virtual, offsite) [default: in-studio]
    venue: String
    room: String
    address: {
      street: String
      city: String
      state: String
      zipCode: String
      country: String [default: United States]
    }
    virtualLink: String
    instructions: String
  }
  
  // Staff
  instructors: [{
    instructor: ObjectId (required, ref: User)
    role: String (enum: lead, assistant, guest, co-instructor) [default: lead]
    bio: String
  }]
  organizer: ObjectId (ref: User)
  
  // Capacity
  maxCapacity: Number (required, min 1)
  minCapacity: Number [default: 1, min 1]
  waitlistCapacity: Number [default: 10, min 0]
  currentRegistrations: Number [default: 0, min 0]
  
  // Pricing
  pricing: {
    type: String (enum: free, paid, member-only, donation) [default: paid]
    amount: Number [default: 0, min 0]
    memberPrice: Number (min 0)
    earlyBirdPrice: Number (min 0)
    earlyBirdDeadline: Date
    currency: String [default: USD]
  }
  
  // Registration
  registrationSettings: {
    opensAt: Date
    closesAt: Date
    requiresApproval: Boolean [default: false]
    allowWaitlist: Boolean [default: true]
    cancellationDeadline: Number [default: 24] - hours
    refundPolicy: String
  }
  
  // Requirements
  requirements: {
    fitnessLevel: String (enum: any, beginner, intermediate, advanced) [default: any]
    prerequisites: [String]
    ageRestriction: {
      minAge: Number (min 0)
      maxAge: Number (min 0)
    }
    healthRequirements: [String]
    equipmentNeeded: [String]
    whatToBring: [String]
  }
  
  // Content
  materials: {
    includedItems: [String]
    handouts: [{
      title: String
      url: String
      type: String (enum: pdf, video, audio, link)
    }]
    resources: [{
      title: String
      description: String
      url: String
    }]
  }
  
  // Media
  images: [{
    url: String
    alt: String
    isPrimary: Boolean [default: false]
  }]
  videos: [{
    url: String
    title: String
    description: String
  }]
  
  // Status
  status: String (enum: draft, published, cancelled, postponed, completed, full, registration-closed) [default: draft]
  isPublic: Boolean [default: true]
  isFeatured: Boolean [default: false]
  
  // Recurring
  isRecurring: Boolean [default: false]
  recurringPattern: {
    frequency: String (enum: weekly, biweekly, monthly, custom)
    interval: Number
    endDate: Date
    daysOfWeek: [Number] - 0=Sunday, 1=Monday, etc.
  }
  
  // Notifications
  notifications: {
    sendReminders: Boolean [default: true]
    reminderSchedule: [{
      timeBeforeEvent: Number - hours
      message: String
    }]
    confirmationEmail: {
      enabled: Boolean [default: true]
      template: String
      customMessage: String
    }
  }
  
  // Analytics
  analytics: {
    views: Number [default: 0]
    registrationClicks: Number [default: 0]
    conversionRate: Number [default: 0]
    attendanceRate: Number [default: 0]
  }
  
  // SEO & Organization
  tags: [String]
  seoData: {
    metaTitle: String
    metaDescription: String
    keywords: [String]
  }
  
  // External
  externalEventId: String
  calendarLinks: {
    google: String
    outlook: String
    ical: String
  }
  
  // Reviews
  allowReviews: Boolean [default: true]
  reviews: [{
    user: ObjectId (ref: User)
    rating: Number (min 1, max 5)
    comment: String
    createdAt: Date [default: now]
  }]
  averageRating: Number [default: 0]
  
  // Administrative
  adminNotes: String
  cancellationReason: String
  postponementReason: String
  newEventDate: Date
  
  // Timestamps
  createdAt: Date [default: now]
  updatedAt: Date [default: now]
}
```

**Indexes**: startDate, eventType+status, status+isPublic, isFeatured+startDate, location.type  
**Virtual Fields**: availableSpots, isFull, registrationStatus, currentPrice, isPast, isToday

---

## 🔒 **Security Implementation**

### **Authentication & Authorization**
- **Password Hashing**: bcrypt with salt rounds of 12
- **JWT Tokens**: Secure token-based authentication
- **Role-Based Access**: member, instructor, admin roles
- **Email Verification**: Required for account activation
- **Password Reset**: Secure token-based reset flow

### **Data Protection**
- **Input Sanitization**: MongoSanitize for NoSQL injection prevention
- **XSS Protection**: XSS-Clean middleware
- **Rate Limiting**: Request throttling per IP
- **CORS**: Configured for specific origins
- **Helmet**: Security headers implementation

### **Database Security**
- **Indexes**: Optimized for query performance
- **Validation**: Comprehensive Mongoose validators
- **Connection Security**: SSL/TLS for production
- **Access Control**: Environment-based configurations

---

## 📈 **Scalability Features**

### **Performance Optimization**
- **Connection Pooling**: MongoDB connection pool management
- **Indexes**: Strategic indexing for common queries
- **Aggregation Pipelines**: Efficient data processing
- **Virtual Fields**: Computed fields without storage overhead

### **Monitoring & Analytics**
- **Health Checks**: System and database health endpoints
- **Request Logging**: Comprehensive request/response logging
- **Performance Metrics**: Memory usage and response time tracking
- **Business Analytics**: Built-in analytics for bookings, events, memberships

### **Data Management**
- **Soft Deletes**: Status-based deletion for data retention
- **Audit Trails**: Comprehensive timestamp tracking
- **Data Relationships**: Properly structured references
- **Backup Strategy**: Database health and statistics endpoints

---

## 🛠️ **Development Tools**

### **Database Management**
- **Seeding**: Automated initial data seeding
- **Migrations**: Schema version management
- **Testing**: Database cleanup utilities
- **Statistics**: Real-time database metrics

### **API Documentation**
- **Health Endpoints**: System status monitoring
- **Error Handling**: Comprehensive error responses
- **Logging**: Structured logging with colors and categories
- **Development Mode**: Enhanced debugging and documentation

This database schema provides a robust, secure, and scalable foundation for the Pilates for She application, supporting all current features while being extensible for future growth.
