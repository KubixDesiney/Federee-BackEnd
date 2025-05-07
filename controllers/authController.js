const User = require('../models/User');
const { generateToken, verifyWeb3Auth } = require('../services/authService');

exports.web3Login = async (req, res) => {
  try {
    const { token } = req.body;
    
    
    const web3authResponse = await verifyWeb3Auth(token);
    const walletAddress = web3authResponse.address;
    
    
    let user = await User.findOne({ walletAddress });
    
    if (!user) {
      user = await User.create({ walletAddress });
    }
    
    
    const authToken = generateToken(user._id);
    
    res.status(200).json({
      success: true,
      token: authToken,
      user: {
        id: user._id,
        walletAddress: user.walletAddress,
        role: user.role
      }
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};