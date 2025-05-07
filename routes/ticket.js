const express = require('express');
const { authenticate } = require('../middleware/auth');
const { issueTicket, verifyTicket } = require('../controllers/ticketController');
const router = express.Router();

router.post('/:eventId/issue', authenticate, issueTicket);
router.post('/:ticketId/verify', authenticate, verifyTicket);

module.exports = router;