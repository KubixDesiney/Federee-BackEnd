const express = require('express');
const {
  createEvent,
  getEvents,
  registerForEvent,
  verifyAttendance
} = require('../controllers/eventController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, createEvent)
  .get(getEvents);

router.route('/:id/register')
  .post(protect, registerForEvent);

router.route('/:id/verify')
  .post(protect, verifyAttendance);

module.exports = router;