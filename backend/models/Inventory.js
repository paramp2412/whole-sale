const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  location: {
    warehouse: String,
    section: String,
    shelf: String,
  },
  transactions: [{
    type: {
      type: String,
      enum: ['in', 'out', 'adjustment'],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    reason: String,
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  }],
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Method to update product stock quantity
InventorySchema.methods.updateProductStock = async function() {
  const Product = mongoose.model('Product');
  await Product.findByIdAndUpdate(this.product, { stockQuantity: this.quantity });
};

// Pre-save hook to update the lastUpdated field
InventorySchema.pre('save', function(next) {
  this.lastUpdated = Date.now();
  next();
});

module.exports = mongoose.model('Inventory', InventorySchema);
