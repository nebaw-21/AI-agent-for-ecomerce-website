const express = require('express');
const router = express.Router();
const shippingController = require('../controllers/shippingController');

// POST /shipping
router.post('/', shippingController.createShipping);

// GET /shipping/:order_id
router.get('/:order_id', shippingController.getShippingByOrderId);

module.exports = router;