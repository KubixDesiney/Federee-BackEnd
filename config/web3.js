const Web3 = require('web3');
const fs = require('fs');

let web3, contract;

module.exports = {
  init: () => {
    web3 = new Web3(process.env.WEB3_PROVIDER);
    const abi = JSON.parse(fs.readFileSync('./config/ContractABI.json', 'utf8'));
    contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);
    console.log('✅ Web3 initialized, contract loaded');
  },
  get web3() { return web3; },
  get contract() { return contract; }
};