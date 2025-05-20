const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    enum: ['Massager', 'Toys', 'Books', 'Other'],
    required: true,
  },
  sku: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  costPrice: {
    type: Number,
    required: true,
  },
  stockQuantity: {
    type: Number,
    required: true,
    default: 0,
  },
  lowStockThreshold: {
    type: Number,
    default: 10,
  },
  images: [{
    type: String,
  }],
  supplier: {
    name: String,
    contactInfo: String,
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

// Virtual for checking if product is low on stock
ProductSchema.virtual('isLowStock').get(function() {
  return this.stockQuantity <= this.lowStockThreshold;
});

// Virtual for profit margin
ProductSchema.virtual('profitMargin').get(function() {
  return ((this.price - this.costPrice) / this.price) * 100;
});

module.exports = mongoose.model('Product', ProductSchema);
