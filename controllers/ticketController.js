const Ticket = require('../models/Ticket');
const Event = require('../models/Event');
const QRCode = require('qrcode');
const { contract } = require('../config/web3');

exports.issueTicket = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    // Smart contract mintTicket
    const receipt = await contract.methods.issueTicket(event.onChainId, req.user.walletAddress).send({ from: req.user.walletAddress });
    const ticketId = receipt.events.TicketIssued.returnValues.ticketId;

    const qrData = await QRCode.toDataURL(JSON.stringify({ ticketId }));
    const ticket = await Ticket.create({ event: event._id, owner: req.user._id, qrData });
    res.status(201).json(ticket);
  } catch (err) { next(err); }
};

exports.verifyTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.ticketId);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
    // On-chain verify
    await contract.methods.verifyTicket(ticket.event.onChainId, ticket.owner).send({ from: req.user.walletAddress });
    ticket.status = 'Used';
    await ticket.save();
    res.json({ success: true });
  } catch (err) { next(err); }
};