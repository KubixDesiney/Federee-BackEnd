const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  walletAddress: { type: String, unique: true, required: true },
  role: { type: String, enum: ['Founder', 'Admin', 'Member'], default: 'Member' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);