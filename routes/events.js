const express = require('express');
const { authenticateJWT, authorizeRole } = require('../middleware/auth');
const { createEvent, updateEvent, listEvents } = require('../controllers/eventController');
const router = express.Router();

router.post('/', authenticateJWT, authorizeRole('Admin', 'Founder'), createEvent);
router.put('/:eventId', authenticateJWT, authorizeRole('Admin', 'Founder'), updateEvent);
router.get('/', authenticateJWT, listEvents);

module.exports = router;