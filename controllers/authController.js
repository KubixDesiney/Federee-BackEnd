const { Web3Auth } = require('@web3auth/web3auth');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const web3auth = new Web3Auth({ clientId: process.env.WEB3AUTH_CLIENT_ID });

exports.login = async (req, res, next) => {
  try {
    const { idToken } = req.body;
    const userInfo = await web3auth.verifyIdToken({ idToken });
    const walletAddress = userInfo.walletAddress;

    let user = await User.findOne({ walletAddress });
    if (!user) user = await User.create({ walletAddress });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '12h' });
    res.json({ token, role: user.role });
  } catch (err) {
    next(err);
  }
};