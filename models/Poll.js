const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  question: String,
  options: [String],
  onChainId: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Poll', pollSchema);