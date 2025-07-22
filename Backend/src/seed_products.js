const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai_ecommerce';

const Product = mongoose.model('Product', new mongoose.Schema({
  product_name: { type: String, required: true, unique: true },
  available: Boolean,
  stock: Number,
}, { collection: 'products' }));

const Order = mongoose.model('Order', new mongoose.Schema({
  order_id: { type: String, required: true },
  status: String,
  user_id: String,
  product_name: String,
}, { collection: 'orders' }));

const sampleProducts = [
  { product_name: 'Laptop', available: true, stock: 15 },
  { product_name: 'Smartphone', available: true, stock: 30 },
  { product_name: 'Headphones', available: false, stock: 0 },
  { product_name: 'Keyboard', available: true, stock: 25 },
  { product_name: 'Monitor', available: true, stock: 10 },
];

async function seed() {
  try {
    await mongoose.connect(mongoUri);
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    await Order.deleteMany({});
    console.log('Sample products seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed(); 