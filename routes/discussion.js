const express = require('express');
const { authenticate } = require('../middleware/auth');
const { postMessage, getMessages } = require('../controllers/discussionController');
const router = express.Router();

router.post('/:eventId', authenticate, postMessage);
router.get('/:eventId', authenticate, getMessages);

module.exports = router;
