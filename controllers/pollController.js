const Poll = require('../models/Poll');
const Vote = require('../models/Vote');
const { contract } = require('../config/web3');

exports.createPoll = async (req, res, next) => {
  try {
    const { question, options } = req.body;
    const receipt = await contract.methods.createPoll(req.params.eventId, options).send({ from: req.user.walletAddress });
    const onChainId = receipt.events.PollCreated.returnValues.pollId;
    const poll = await Poll.create({ event: req.params.eventId, question, options, onChainId });
    res.status(201).json(poll);
  } catch (err) { next(err); }
};

exports.votePoll = async (req, res, next) => {
  try {
    const { optionIndex } = req.body;
    const poll = await Poll.findById(req.params.pollId);
    if (!poll) return res.status(404).json({ error: 'Poll not found' });
    // ensure not voted
    const existing = await Vote.findOne({ poll: poll._id, user: req.user._id });
    if (existing) return res.status(400).json({ error: 'Already voted' });
    await contract.methods.vote(poll.onChainId, optionIndex).send({ from: req.user.walletAddress });
    const vote = await Vote.create({ poll: poll._id, user: req.user._id, optionIndex });
    res.json(vote);
  } catch (err) { next(err); }
};

exports.getPoll = async (req, res, next) => {
  try {
    const poll = await Poll.findById(req.params.pollId);
    const votes = await Vote.find({ poll: poll._id });
    res.json({ poll, votes });
  } catch (err) { next(err); }
};