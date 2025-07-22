const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  product_name: { type: String, required: true, unique: true },
  available: Boolean,
  stock: Number,
  image_url: String, // Add image_url to product schema if not already present
  price: Number // <-- Ensure price field exists
}, { collection: 'products' });

module.exports = mongoose.model('Product', ProductSchema);
