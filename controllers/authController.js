// controllers/authController.js
require('dotenv').config();
const { Web3Auth }        = require('@web3auth/web3auth');
const { CHAIN_NAMESPACES } = require('@web3auth/base');
const jwt                 = require('jsonwebtoken');

// instantiate
const web3auth = new Web3Auth({
  clientId:  process.env.WEB3AUTH_CLIENT_ID,
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId:        process.env.CHAIN_ID_HEX,
    rpcTarget:      process.env.WEB3_PROVIDER,
  }
});

// initialize (load adapters, etc.)
async function initWeb3Auth() {
  await web3auth.init();
  console.log('✅ Web3Auth initialized');
}
initWeb3Auth();

// your login handler
async function login(req, res, next) {
  try {
    const { idToken } = req.body;
    const provider    = await web3auth.connect();   // triggers the OIDC flow
    const userInfo    = await web3auth.getUserInfo();
    // … sign your own JWT, lookup/create user in Mongo, etc …
    const token = jwt.sign({ sub: userInfo?.sub, role: 'Member' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, role: 'Member' });
  } catch (err) {
    next(err);
  }
}

module.exports = { login };
