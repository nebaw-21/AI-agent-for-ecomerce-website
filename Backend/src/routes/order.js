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

// POST /order
router.post('/', async (req, res) => {
  const { Order } = req.app.locals.models;
  const { product_name, user_id } = req.body;
  if (!product_name || !user_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const order_id = `ORD-${Date.now()}`;
    const order = await Order.create({ order_id, status: 'Placed', user_id, product_name });
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /order
router.get('/', async (req, res) => {
  const { Order } = req.app.locals.models;
  try {
    const orders = await Order.find({}).sort({ _id: -1 });
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 