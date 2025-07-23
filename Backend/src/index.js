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

// Import models (registers them with mongoose)
require('./models/Order');
require('./models/Shipping');
require('./models/Product');
require('./models/Log');

// Import and use routes
const orderRoutes = require('./routes/order');
const shippingRoutes = require('./routes/shipping');
const productRoutes = require('./routes/product');
const logRoutes = require('./routes/log');
const chatRoutes = require('./routes/chat');

app.use('/order', orderRoutes);
app.use('/shipping', shippingRoutes);
app.use('/product', productRoutes);
app.use('/log', logRoutes);
app.use('/chat', chatRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});