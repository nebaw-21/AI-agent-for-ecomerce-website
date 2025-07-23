const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// POST /order
router.post('/', orderController.createOrder);

// GET /order
router.get('/', orderController.getAllOrders);

// GET /order/:order_id
router.get('/:order_id', orderController.getOrderById);

// POST /order/fuzzy
router.post('/fuzzy', orderController.orderByNameAndPriceRange);

// DELETE /order/delete-by-name/:name
router.delete('/delete-by-name/:name', orderController.deleteOrderByNameFuzzy);

// POST /order/by-name
router.post('/by-name', orderController.orderByName);

module.exports = router;