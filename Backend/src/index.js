const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Database = require('better-sqlite3');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Connect to SQLite database
const db = new Database(path.join(__dirname, '../db.sqlite'));
app.locals.db = db;

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