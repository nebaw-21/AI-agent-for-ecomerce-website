const Shipping = require('../models/Shipping');

exports.createShipping = async (req, res) => {
  const { tracking_id, status, order_id } = req.body;
  if (!tracking_id || !order_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const shipping = await Shipping.create({ tracking_id, status, order_id });
    res.json({ success: true, shipping });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getShippingByOrderId = async (req, res) => {
  const { order_id } = req.params;
  try {
    const shipping = await Shipping.findOne({ order_id });
    if (!shipping) return res.status(404).json({ error: 'Shipping not found' });
    res.json({ shipping });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

