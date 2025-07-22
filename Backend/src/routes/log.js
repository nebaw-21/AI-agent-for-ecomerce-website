const express = require('express');
const router = express.Router();

// POST /log
router.post('/', (req, res) => {
  const db = req.app.locals.db;
  const { user_id, query, response } = req.body;
  if (!user_id || !query || !response) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const timestamp = new Date().toISOString();
  db.prepare('INSERT INTO logs (user_id, query, response, timestamp) VALUES (?, ?, ?, ?)')
    .run(user_id, query, response, timestamp);
  res.json({ success: true });
});

// GET /log/:user_id
router.get('/:user_id', (req, res) => {
  const db = req.app.locals.db;
  const { user_id } = req.params;
  const logs = db.prepare('SELECT query, response, timestamp FROM logs WHERE user_id = ? ORDER BY timestamp DESC').all(user_id);
  res.json({ logs });
});

module.exports = router; 