const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  order_id: { type: String, required: true, unique: true },
  status: String,
  user_id: String,
  product_name: String,
  image_url: String // Add image_url to order schema
}, { collection: 'orders' });

module.exports = mongoose.model('Order', OrderSchema);
