const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  qrData: String,
  status: { type: String, enum: ['Issued', 'Used'], default: 'Issued' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ticket', ticketSchema);