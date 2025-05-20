const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  position: {
    type: String,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    trim: true,
  },
  contactInfo: {
    email: String,
    phone: String,
    address: String,
  },
  clockInHistory: [{
    clockIn: {
      type: Date,
    },
    clockOut: {
      type: Date,
    },
    totalHours: {
      type: Number,
    },
  }],
  activities: [{
    type: {
      type: String,
      enum: ['sale', 'inventory', 'customer', 'other'],
    },
    description: String,
    timestamp: {
      type: Date,
      default: Date.now,
    },
  }],
  performance: {
    salesTarget: {
      type: Number,
      default: 0,
    },
    salesAchieved: {
      type: Number,
      default: 0,
    },
    tasksCompleted: {
      type: Number,
      default: 0,
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Virtual for full name
StaffSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for performance percentage
StaffSchema.virtual('performancePercentage').get(function() {
  if (this.performance.salesTarget === 0) return 0;
  return (this.performance.salesAchieved / this.performance.salesTarget) * 100;
});

module.exports = mongoose.model('Staff', StaffSchema);
