const express = require('express');
const router = express.Router();

// GET /shipping/:tracking_id
router.get('/:tracking_id', async (req, res) => {
  const { Shipping } = req.app.locals.models;
  const { tracking_id } = req.params;
  try {
    const shipping = await Shipping.findOne({ tracking_id });
    if (shipping) {
      res.json({ status: shipping.status });
    } else {
      res.status(404).json({ error: 'Tracking ID not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 