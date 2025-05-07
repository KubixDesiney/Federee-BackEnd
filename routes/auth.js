const express = require('express');
const router  = express.Router();
const { Web3Auth }      = require('@web3auth/web3auth');
const { CHAIN_NAMESPACES } = require('@web3auth/base');
const jwt                = require('jsonwebtoken');

// 1) Instantiate & initialize Web3Auth (once)
const web3auth = new Web3Auth({
  clientId:  process.env.WEB3AUTH_CLIENT_ID,
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId:        process.env.CHAIN_ID_HEX,
    rpcTarget:      process.env.WEB3_PROVIDER,
  }
});
web3auth.init().then(() => console.log('✅ Web3Auth initialized'));

// 2) Login route
router.post('/login', async (req, res, next) => {
  try {
    const { idToken } = req.body;
    const provider    = await web3auth.connect();          // triggers Web3Auth flow
    const userInfo    = await web3auth.getUserInfo();
    // Here you’d look up or create your user in MongoDB, set their role, etc.
    const token = jwt.sign(
      { sub: userInfo.sub, role: 'Member' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token, role: 'Member' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;