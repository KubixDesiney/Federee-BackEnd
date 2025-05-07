const { createEventOnChain } = require('../services/blockchainService');

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