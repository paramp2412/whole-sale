const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');

// @route   GET api/customers
// @desc    Get all customers
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const customers = await Customer.find().sort({ name: 1 });
    res.json(customers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/customers/:id
// @desc    Get customer by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    
    if (!customer) {
      return res.status(404).json({ msg: 'Customer not found' });
    }
    
    res.json(customer);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Customer not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   POST api/customers
// @desc    Create a customer
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      company,
      segment,
      industry,
      notes
    } = req.body;
    
    // Create new customer
    const newCustomer = new Customer({
      name,
      email,
      phone,
      address,
      company,
      segment,
      industry,
      notes
    });
    
    const customer = await newCustomer.save();
    
    res.json(customer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/customers/:id
// @desc    Update customer
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      company,
      segment,
      industry,
      notes
    } = req.body;
    
    // Build customer object
    const customerFields = {};
    if (name) customerFields.name = name;
    if (email) customerFields.email = email;
    if (phone) customerFields.phone = phone;
    if (address) customerFields.address = address;
    if (company) customerFields.company = company;
    if (segment) customerFields.segment = segment;
    if (industry) customerFields.industry = industry;
    if (notes) customerFields.notes = notes;
    customerFields.updatedAt = Date.now();
    
    let customer = await Customer.findById(req.params.id);
    
    if (!customer) {
      return res.status(404).json({ msg: 'Customer not found' });
    }
    
    customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { $set: customerFields },
      { new: true }
    );
    
    res.json(customer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/customers/:id
// @desc    Delete customer
// @access  Private/Admin
router.delete('/:id', [auth, roleAuth(['admin'])], async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    
    if (!customer) {
      return res.status(404).json({ msg: 'Customer not found' });
    }
    
    await Customer.findByIdAndRemove(req.params.id);
    
    res.json({ msg: 'Customer removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/customers/segment/:segment
// @desc    Get customers by segment
// @access  Private
router.get('/segment/:segment', auth, async (req, res) => {
  try {
    const customers = await Customer.find({ segment: req.params.segment }).sort({ name: 1 });
    res.json(customers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
