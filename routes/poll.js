const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const { createPoll, votePoll, getPoll } = require('../controllers/pollController');
const router = express.Router();

router.post('/:eventId', authenticate, authorize('Admin','Founder'), createPoll);
router.post('/:pollId/vote', authenticate, votePoll);
router.get('/:pollId', authenticate, getPoll);

module.exports = router;