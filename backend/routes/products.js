const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');

// @route   GET api/products
// @desc    Get all products
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const products = await Product.find().sort({ name: 1 });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/products/:id
// @desc    Get product by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    
    res.json(product);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   POST api/products
// @desc    Create a product
// @access  Private/Admin
router.post('/', [auth, roleAuth(['admin'])], async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      sku,
      price,
      costPrice,
      stockQuantity,
      lowStockThreshold,
      images,
      supplier,
      isActive
    } = req.body;
    
    // Check if product with SKU already exists
    let product = await Product.findOne({ sku });
    if (product) {
      return res.status(400).json({ msg: 'Product with this SKU already exists' });
    }
    
    // Create new product
    const newProduct = new Product({
      name,
      description,
      category,
      sku,
      price,
      costPrice,
      stockQuantity,
      lowStockThreshold,
      images,
      supplier,
      isActive
    });
    
    product = await newProduct.save();
    
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/products/:id
// @desc    Update product
// @access  Private/Admin
router.put('/:id', [auth, roleAuth(['admin'])], async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      sku,
      price,
      costPrice,
      stockQuantity,
      lowStockThreshold,
      images,
      supplier,
      isActive
    } = req.body;
    
    // Build product object
    const productFields = {};
    if (name) productFields.name = name;
    if (description) productFields.description = description;
    if (category) productFields.category = category;
    if (sku) productFields.sku = sku;
    if (price) productFields.price = price;
    if (costPrice) productFields.costPrice = costPrice;
    if (stockQuantity !== undefined) productFields.stockQuantity = stockQuantity;
    if (lowStockThreshold) productFields.lowStockThreshold = lowStockThreshold;
    if (images) productFields.images = images;
    if (supplier) productFields.supplier = supplier;
    if (isActive !== undefined) productFields.isActive = isActive;
    productFields.updatedAt = Date.now();
    
    let product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    
    // If updating SKU, check if it already exists
    if (sku && sku !== product.sku) {
      const existingProduct = await Product.findOne({ sku });
      if (existingProduct) {
        return res.status(400).json({ msg: 'Product with this SKU already exists' });
      }
    }
    
    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: productFields },
      { new: true }
    );
    
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/products/:id
// @desc    Delete product
// @access  Private/Admin
router.delete('/:id', [auth, roleAuth(['admin'])], async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    
    await Product.findByIdAndRemove(req.params.id);
    
    res.json({ msg: 'Product removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/products/category/:category
// @desc    Get products by category
// @access  Private
router.get('/category/:category', auth, async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category }).sort({ name: 1 });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/products/low-stock
// @desc    Get products with low stock
// @access  Private
router.get('/low-stock', auth, async (req, res) => {
  try {
    const products = await Product.find();
    const lowStockProducts = products.filter(product => product.stockQuantity <= product.lowStockThreshold);
    res.json(lowStockProducts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
