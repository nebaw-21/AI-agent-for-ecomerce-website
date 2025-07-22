const express = require('express');
const router = express.Router();

// GET /shipping/:tracking_id
router.get('/:tracking_id', (req, res) => {
  const db = req.app.locals.db;
  const { tracking_id } = req.params;
  const shipping = db.prepare('SELECT status FROM shipping WHERE tracking_id = ?').get(tracking_id);
  if (shipping) {
    res.json({ status: shipping.status });
  } else {
    res.status(404).json({ error: 'Tracking ID not found' });
  }
});

module.exports = router; 