const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const { createEvent, updateEvent, listEvents } = require('../controllers/eventController');
const router = express.Router();

router.post('/', authenticate, authorize('Admin', 'Founder'), createEvent);
router.put('/:eventId', authenticate, authorize('Admin', 'Founder'), updateEvent);
router.get('/', authenticate, listEvents);

module.exports = router;