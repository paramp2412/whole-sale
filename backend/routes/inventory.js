const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');

// @route   GET api/inventory
// @desc    Get all inventory items
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const inventory = await Inventory.find().populate('product', 'name sku category');
    res.json(inventory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/inventory/:id
// @desc    Get inventory item by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const inventory = await Inventory.findById(req.params.id).populate('product', 'name sku category');
    
    if (!inventory) {
      return res.status(404).json({ msg: 'Inventory item not found' });
    }
    
    res.json(inventory);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Inventory item not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   POST api/inventory
// @desc    Create an inventory item
// @access  Private/Admin
router.post('/', [auth, roleAuth(['admin'])], async (req, res) => {
  try {
    const {
      product,
      quantity,
      location
    } = req.body;
    
    // Check if product exists
    const productExists = await Product.findById(product);
    if (!productExists) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    
    // Check if inventory item for this product already exists
    let inventoryItem = await Inventory.findOne({ product });
    if (inventoryItem) {
      return res.status(400).json({ msg: 'Inventory item for this product already exists' });
    }
    
    // Create new inventory item
    const newInventory = new Inventory({
      product,
      quantity,
      location,
      transactions: [{
        type: 'in',
        quantity,
        reason: 'Initial stock',
        performedBy: req.user.id
      }]
    });
    
    inventoryItem = await newInventory.save();
    
    // Update product stock quantity
    await Product.findByIdAndUpdate(product, { stockQuantity: quantity });
    
    res.json(inventoryItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/inventory/:id
// @desc    Update inventory item
// @access  Private/Admin
router.put('/:id', [auth, roleAuth(['admin'])], async (req, res) => {
  try {
    const {
      quantity,
      location
    } = req.body;
    
    // Build inventory object
    const inventoryFields = {};
    if (location) inventoryFields.location = location;
    
    let inventory = await Inventory.findById(req.params.id);
    
    if (!inventory) {
      return res.status(404).json({ msg: 'Inventory item not found' });
    }
    
    // If quantity is changing, add a transaction
    if (quantity !== undefined && quantity !== inventory.quantity) {
      const transactionType = quantity > inventory.quantity ? 'in' : 'out';
      const transactionQuantity = Math.abs(quantity - inventory.quantity);
      
      inventoryFields.quantity = quantity;
      inventoryFields.transactions = [
        ...inventory.transactions,
        {
          type: transactionType,
          quantity: transactionQuantity,
          reason: 'Manual adjustment',
          performedBy: req.user.id
        }
      ];
    }
    
    inventory = await Inventory.findByIdAndUpdate(
      req.params.id,
      { $set: inventoryFields },
      { new: true }
    );
    
    // Update product stock quantity if quantity changed
    if (quantity !== undefined) {
      await Product.findByIdAndUpdate(inventory.product, { stockQuantity: quantity });
    }
    
    res.json(inventory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/inventory/:id/transaction
// @desc    Add a transaction to inventory
// @access  Private
router.post('/:id/transaction', auth, async (req, res) => {
  try {
    const {
      type,
      quantity,
      reason
    } = req.body;
    
    if (!['in', 'out', 'adjustment'].includes(type)) {
      return res.status(400).json({ msg: 'Invalid transaction type' });
    }
    
    let inventory = await Inventory.findById(req.params.id);
    
    if (!inventory) {
      return res.status(404).json({ msg: 'Inventory item not found' });
    }
    
    // Calculate new quantity
    let newQuantity = inventory.quantity;
    if (type === 'in') {
      newQuantity += quantity;
    } else if (type === 'out') {
      if (quantity > inventory.quantity) {
        return res.status(400).json({ msg: 'Not enough stock available' });
      }
      newQuantity -= quantity;
    } else if (type === 'adjustment') {
      newQuantity = quantity;
    }
    
    // Add transaction
    inventory.transactions.push({
      type,
      quantity,
      reason,
      performedBy: req.user.id
    });
    
    inventory.quantity = newQuantity;
    inventory.lastUpdated = Date.now();
    
    await inventory.save();
    
    // Update product stock quantity
    await Product.findByIdAndUpdate(inventory.product, { stockQuantity: newQuantity });
    
    res.json(inventory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
