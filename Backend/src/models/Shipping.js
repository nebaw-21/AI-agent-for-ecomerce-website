const mongoose = require('mongoose');

const ShippingSchema = new mongoose.Schema({
  tracking_id: { type: String, required: true, unique: true },
  status: String,
  order_id: String,
}, { collection: 'shipping' });

module.exports = mongoose.model('Shipping', ShippingSchema);
