const jwt = require('jsonwebtoken');
const { Web3 } = require('web3');
const { Web3Auth } = require('@web3auth/node');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

const verifyWeb3Auth = async (token) => {
  const web3auth = new Web3Auth({
    clientId: process.env.WEB3AUTH_CLIENT_ID,
    chainConfig: {
      chainNamespace: "eip155",
      chainId: "0x5", 
      rpcTarget: `https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
    }
  });
  
  return await web3auth.authenticate(token);
};

module.exports = {
  generateToken,
  verifyWeb3Auth
};