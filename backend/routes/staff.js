const express = require('express');
const router = express.Router();
const Staff = require('../models/Staff');
const User = require('../models/User');
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');

// @route   GET api/staff
// @desc    Get all staff
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const staff = await Staff.find().populate('user', 'username email role');
    res.json(staff);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/staff/:id
// @desc    Get staff by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id).populate('user', 'username email role');
    
    if (!staff) {
      return res.status(404).json({ msg: 'Staff not found' });
    }
    
    res.json(staff);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Staff not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   POST api/staff
// @desc    Create a staff profile
// @access  Private/Admin
router.post('/', [auth, roleAuth(['admin'])], async (req, res) => {
  try {
    const {
      user,
      firstName,
      lastName,
      position,
      department,
      contactInfo
    } = req.body;
    
    // Check if user exists
    const userExists = await User.findById(user);
    if (!userExists) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    // Check if staff profile for this user already exists
    let staffProfile = await Staff.findOne({ user });
    if (staffProfile) {
      return res.status(400).json({ msg: 'Staff profile for this user already exists' });
    }
    
    // Create new staff profile
    const newStaff = new Staff({
      user,
      firstName,
      lastName,
      position,
      department,
      contactInfo
    });
    
    staffProfile = await newStaff.save();
    
    res.json(staffProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/staff/:id
// @desc    Update staff profile
// @access  Private/Admin
router.put('/:id', [auth, roleAuth(['admin'])], async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      position,
      department,
      contactInfo,
      isActive
    } = req.body;
    
    // Build staff object
    const staffFields = {};
    if (firstName) staffFields.firstName = firstName;
    if (lastName) staffFields.lastName = lastName;
    if (position) staffFields.position = position;
    if (department) staffFields.department = department;
    if (contactInfo) staffFields.contactInfo = contactInfo;
    if (isActive !== undefined) staffFields.isActive = isActive;
    staffFields.updatedAt = Date.now();
    
    let staff = await Staff.findById(req.params.id);
    
    if (!staff) {
      return res.status(404).json({ msg: 'Staff not found' });
    }
    
    staff = await Staff.findByIdAndUpdate(
      req.params.id,
      { $set: staffFields },
      { new: true }
    );
    
    res.json(staff);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/staff/clock-in
// @desc    Clock in
// @access  Private
router.post('/clock-in', auth, async (req, res) => {
  try {
    // Find staff profile for the logged-in user
    const staff = await Staff.findOne({ user: req.user.id });
    
    if (!staff) {
      return res.status(404).json({ msg: 'Staff profile not found' });
    }
    
    // Check if already clocked in
    const lastClockIn = staff.clockInHistory[staff.clockInHistory.length - 1];
    if (lastClockIn && !lastClockIn.clockOut) {
      return res.status(400).json({ msg: 'Already clocked in' });
    }
    
    // Add new clock in
    staff.clockInHistory.push({
      clockIn: Date.now()
    });
    
    await staff.save();
    
    res.json(staff);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/staff/clock-out
// @desc    Clock out
// @access  Private
router.post('/clock-out', auth, async (req, res) => {
  try {
    // Find staff profile for the logged-in user
    const staff = await Staff.findOne({ user: req.user.id });
    
    if (!staff) {
      return res.status(404).json({ msg: 'Staff profile not found' });
    }
    
    // Check if clocked in
    if (staff.clockInHistory.length === 0) {
      return res.status(400).json({ msg: 'Not clocked in' });
    }
    
    const lastClockInIndex = staff.clockInHistory.length - 1;
    const lastClockIn = staff.clockInHistory[lastClockInIndex];
    
    if (lastClockIn.clockOut) {
      return res.status(400).json({ msg: 'Not clocked in' });
    }
    
    // Update clock out time
    const clockOutTime = Date.now();
    const totalHours = (clockOutTime - lastClockIn.clockIn) / (1000 * 60 * 60);
    
    staff.clockInHistory[lastClockInIndex].clockOut = clockOutTime;
    staff.clockInHistory[lastClockInIndex].totalHours = parseFloat(totalHours.toFixed(2));
    
    await staff.save();
    
    res.json(staff);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/staff/:id/activity
// @desc    Add staff activity
// @access  Private
router.post('/:id/activity', auth, async (req, res) => {
  try {
    const {
      type,
      description
    } = req.body;
    
    if (!['sale', 'inventory', 'customer', 'other'].includes(type)) {
      return res.status(400).json({ msg: 'Invalid activity type' });
    }
    
    let staff = await Staff.findById(req.params.id);
    
    if (!staff) {
      return res.status(404).json({ msg: 'Staff not found' });
    }
    
    // Add activity
    staff.activities.push({
      type,
      description,
      timestamp: Date.now()
    });
    
    await staff.save();
    
    res.json(staff);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/staff/:id/performance
// @desc    Update staff performance
// @access  Private/Admin
router.put('/:id/performance', [auth, roleAuth(['admin'])], async (req, res) => {
  try {
    const {
      salesTarget,
      salesAchieved,
      tasksCompleted
    } = req.body;
    
    let staff = await Staff.findById(req.params.id);
    
    if (!staff) {
      return res.status(404).json({ msg: 'Staff not found' });
    }
    
    // Update performance
    const performanceFields = {};
    if (salesTarget !== undefined) performanceFields['performance.salesTarget'] = salesTarget;
    if (salesAchieved !== undefined) performanceFields['performance.salesAchieved'] = salesAchieved;
    if (tasksCompleted !== undefined) performanceFields['performance.tasksCompleted'] = tasksCompleted;
    
    staff = await Staff.findByIdAndUpdate(
      req.params.id,
      { $set: performanceFields },
      { new: true }
    );
    
    res.json(staff);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
