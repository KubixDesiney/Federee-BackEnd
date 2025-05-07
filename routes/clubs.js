const express = require('express');
const { authenticateJWT, authorizeRole } = require('../middleware/auth');
const { createClub, joinClub, getClub } = require('../controllers/clubController');
const router = express.Router();

router.post(
    '/', 
    authenticateJWT,           // was authenticate
    authorizeRole('Founder'),  // was authorize('Founder')
    createClub
  );

module.exports = router;