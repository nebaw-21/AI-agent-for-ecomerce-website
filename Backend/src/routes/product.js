const express = require('express');
const router = express.Router();

// GET /product/name/:product_name
router.get('/name/:product_name', (req, res) => {
  const db = req.app.locals.db;
  const { product_name } = req.params;
  const product = db.prepare('SELECT available, stock FROM products WHERE product_name = ?').get(product_name);
  if (product) {
    res.json({ available: !!product.available, stock: product.stock });
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

module.exports = router; 