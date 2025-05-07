const { ethers } = require('ethers');
const contractABI = require('../contracts/InterClub.json');

const provider = new ethers.JsonRpcProvider(
  `https://${process.env.ETHEREUM_NETWORK}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
);

const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  contractABI,
  provider
);

const createEventOnChain = async (eventData, privateKey) => {
  const wallet = new ethers.Wallet(privateKey, provider);
  const contractWithSigner = contract.connect(wallet);
  
  const tx = await contractWithSigner.createEvent(
    eventData.title,
    eventData.date,
    eventData.description,
    eventData.organizerAddress
  );
  
  return tx.wait();
};

const verifyAttendance = async (ticketId, privateKey) => {
  const wallet = new ethers.Wallet(privateKey, provider);
  const contractWithSigner = contract.connect(wallet);
  
  const tx = await contractWithSigner.verifyAttendance(ticketId);
  return tx.wait();
};

module.exports = {
  createEventOnChain,
  verifyAttendance
};