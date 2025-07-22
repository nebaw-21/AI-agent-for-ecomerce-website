const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai_ecommerce';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define schemas and models
const Order = mongoose.model('Order', new mongoose.Schema({
  order_id: { type: String, required: true, unique: true },
  status: String,
  user_id: String,
  product_name: String,
}, { collection: 'orders' }));

const Shipping = mongoose.model('Shipping', new mongoose.Schema({
  tracking_id: { type: String, required: true, unique: true },
  status: String,
  order_id: String,
}, { collection: 'shipping' }));

const Product = mongoose.model('Product', new mongoose.Schema({
  product_name: { type: String, required: true, unique: true },
  available: Boolean,
  stock: Number,
}, { collection: 'products' }));

const Log = mongoose.model('Log', new mongoose.Schema({
  user_id: String,
  query: String,
  response: String,
  timestamp: String,
}, { collection: 'logs' }));

app.locals.models = { Order, Shipping, Product, Log };

// Import and use routes
const orderRoutes = require('./routes/order');
const shippingRoutes = require('./routes/shipping');
const productRoutes = require('./routes/product');
const logRoutes = require('./routes/log');

app.use('/order', orderRoutes);
app.use('/shipping', shippingRoutes);
app.use('/product', productRoutes);
app.use('/log', logRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 