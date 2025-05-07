const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  poll: { type: mongoose.Schema.Types.ObjectId, ref: 'Poll', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  optionIndex: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vote', voteSchema);