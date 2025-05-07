const Club = require('../models/Club');
const User = require('../models/User');

exports.createClub = async (req, res, next) => {
  try {
    const { name } = req.body;
    const club = await Club.create({ name, founder: req.user._id, members: [req.user._id] });
    res.status(201).json(club);
  } catch (err) { next(err); }
};

exports.joinClub = async (req, res, next) => {
  try {
    const club = await Club.findById(req.params.clubId);
    if (!club) return res.status(404).json({ error: 'Club not found' });
    club.members.push(req.user._id);
    await club.save();
    res.json(club);
  } catch (err) { next(err); }
};

exports.getClub = async (req, res, next) => {
  try {
    const club = await Club.findById(req.params.clubId).populate('members', 'walletAddress role');
    if (!club) return res.status(404).json({ error: 'Club not found' });
    res.json(club);
  } catch (err) { next(err); }
};