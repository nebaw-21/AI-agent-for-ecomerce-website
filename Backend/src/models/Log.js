const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  user_id: String,
  query: String,
  response: String,
  timestamp: String,
}, { collection: 'logs' });

module.exports = mongoose.model('Log', LogSchema);
