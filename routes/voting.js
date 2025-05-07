const express = require('express');
const {
  createPoll,
  castVote,
  getPollResults
} = require('../controllers/votingController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, adminOnly, createPoll);

router.route('/:id/vote')
  .post(protect, castVote);

router.route('/:id/results')
  .get(protect, getPollResults);

module.exports = router;