const express = require('express');
const router = express.Router();

// GET /product/name/:product_name
router.get('/name/:product_name', async (req, res) => {
  const { Product } = req.app.locals.models;
  const { product_name } = req.params;
  try {
    const product = await Product.findOne({ product_name });
    if (product) {
      res.json({ available: !!product.available, stock: product.stock });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 