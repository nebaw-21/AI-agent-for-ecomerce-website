const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET /product/name/:product_name
router.get('/name/:product_name', productController.getProductByName);

// GET /product/
router.get('/', productController.getAllProducts);

module.exports = router;