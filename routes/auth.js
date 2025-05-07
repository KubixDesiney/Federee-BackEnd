const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res, next) => {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      return res.status(400).json({ error: 'Missing idToken' });
    }

    // Simulate user
    const fakeUser = { sub: '123', role: 'Member' };

    const token = jwt.sign(
      { sub: fakeUser.sub, role: fakeUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, role: fakeUser.role });
  } catch (err) {
    next(err);
  }
});

module.exports = router;