const express                   = require('express');
const { authenticateJWT,
        authorizeRole }         = require('../middleware/auth');
const {
  createPoll,
  votePoll,
  getPoll
} = require('../controllers/votingController');

const router = express.Router();

// Admins create polls on an event
router.post(
  '/events/:eventId/polls',
  authenticateJWT,
  authorizeRole('Admin'),
  createPoll
);

// Members vote on a poll
router.post(
  '/polls/:pollId/vote',
  authenticateJWT,
  authorizeRole('Member'),
  votePoll
);

// Anyone authenticated can view a poll + its votes
router.get(
  '/polls/:pollId',
  authenticateJWT,
  getPoll
);

module.exports = router;