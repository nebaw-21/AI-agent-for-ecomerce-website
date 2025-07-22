const express = require('express');
const router = express.Router();

// POST /log
router.post('/', async (req, res) => {
  const { Log } = req.app.locals.models;
  const { user_id, query, response } = req.body;
  if (!user_id || !query || !response) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const timestamp = new Date().toISOString();
  try {
    await Log.create({ user_id, query, response, timestamp });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /log/:user_id
router.get('/:user_id', async (req, res) => {
  const { Log } = req.app.locals.models;
  const { user_id } = req.params;
  try {
    const logs = await Log.find({ user_id }).sort({ timestamp: -1 });
    res.json({ logs });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 