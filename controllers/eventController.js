const { createEventOnChain } = require('../services/blockchainService');
const { get, set } = require('../services/cache');

exports.getEvents = async (req, res) => {
  try {
    const cachedEvents = await get('allEvents');
    
    if (cachedEvents) {
      return res.json({
        success: true,
        fromCache: true,
        events: JSON.parse(cachedEvents)
      });
    }
    
    const events = await Event.find().populate('organizer club');
    await set('allEvents', JSON.stringify(events), 'EX', 3600); // Cache for 1 hour
    
    res.json({
      success: true,
      fromCache: false,
      events
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
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