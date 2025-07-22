const express = require('express');
const router = express.Router();

// GET /order/:order_id
router.get('/:order_id', async (req, res) => {
  const { Order } = req.app.locals.models;
  const { order_id } = req.params;
  try {
    const order = await Order.findOne({ order_id });
    if (order) {
      res.json({ status: order.status });
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 