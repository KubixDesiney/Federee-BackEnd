const Event = require('../models/Event');
const { contract, web3 } = require('../config/web3');

exports.createEvent = async (req, res, next) => {
  try {
    const { title, description, date, location, attachments } = req.body;
    // Call smart contract to log event
    const receipt = await contract.methods.createEvent(title, date).send({ from: req.user.walletAddress });
    const onChainId = receipt.events.EventCreated.returnValues.eventId;

    const event = await Event.create({ title, description, date, location, attachments, createdBy: req.user._id, onChainId });
    res.status(201).json(event);
  } catch (err) { next(err); }
};

exports.updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    Object.assign(event, req.body);
    await event.save();
    // Optionally update on-chain via contract.methods.updateEvent(...)
    res.json(event);
  } catch (err) { next(err); }
};

exports.listEvents = async (req, res, next) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) { next(err); }
};

exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, location, clubId } = req.body;
    const organizer = req.user.id;
    
    
    const event = await Event.create({
      title,
      description,
      date,
      location,
      organizer,
      club: clubId
    });
    
    
    const eventData = {
      title,
      date: Math.floor(new Date(date).getTime() / 1000),
      description,
      organizerAddress: req.user.walletAddress
    };
    
    const txReceipt = await createEventOnChain(
      eventData,
      process.env.ADMIN_PRIVATE_KEY
    );
    
    
    event.blockchainId = txReceipt.events[0].args.eventId.toString();
    await event.save();
    
    res.status(201).json({
      success: true,
      event,
      txHash: txReceipt.transactionHash
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};