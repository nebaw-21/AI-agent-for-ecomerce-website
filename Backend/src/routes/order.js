const express = require('express');
const router = express.Router();

// GET /order/:order_id
router.get('/:order_id', (req, res) => {
  const db = req.app.locals.db;
  const { order_id } = req.params;
  const order = db.prepare('SELECT status FROM orders WHERE order_id = ?').get(order_id);
  if (order) {
    res.json({ status: order.status });
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

module.exports = router; 