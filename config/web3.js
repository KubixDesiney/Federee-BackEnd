const { Web3 } = require('web3'); // destructure Web3
let web3;

module.exports = {
  init: () => {
    web3 = new Web3(process.env.WEB3_PROVIDER);
    console.log("✅ Web3 initialized");
  },
  getWeb3: () => web3
};