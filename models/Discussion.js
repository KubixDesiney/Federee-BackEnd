const mongoose = require('mongoose');

const msgSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Discussion', msgSchema);