const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');

// POST /log
router.post('/', logController.createLog);

// GET /log/:user_id
router.get('/:user_id', logController.getLogsByUser);

module.exports = router;