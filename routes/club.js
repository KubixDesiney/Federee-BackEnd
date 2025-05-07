const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const { createClub, joinClub, getClub } = require('../controllers/clubController');
const router = express.Router();

router.post('/', authenticate, authorize('Founder'), createClub);
router.post('/:clubId/join', authenticate, joinClub);
router.get('/:clubId', authenticate, getClub);

module.exports = router;