const Discussion = require('../models/Discussion');

exports.postMessage = async (req, res, next) => {
  try {
    const msg = await Discussion.create({ event: req.params.eventId, user: req.user._id, message: req.body.message });
    res.status(201).json(msg);
  } catch (err) { next(err); }
};

exports.getMessages = async (req, res, next) => {
  try {
    const msgs = await Discussion.find({ event: req.params.eventId }).populate('user', 'walletAddress');
    res.json(msgs);
  } catch (err) { next(err); }
};