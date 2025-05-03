const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all favorites
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user.favorites);
  } catch {
    res.status(500).send('Server error');
  }
});

// Add a favorite
router.post('/', async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findById(req.userId);
    if (!user.favorites.includes(code)) {
      user.favorites.push(code);
      await user.save();
    }
    res.json(user.favorites);
  } catch {
    res.status(500).send('Server error');
  }
});

// Remove a favorite
router.delete('/:code', async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.favorites = user.favorites.filter(c => c !== req.params.code);
    await user.save();
    res.json(user.favorites);
  } catch {
    res.status(500).send('Server error');
  }
});

module.exports = router;
