require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const web3Service = require('./config/web3');

// Import routes
const authRoutes = require('./routes/auth');
const clubRoutes = require('./routes/club');
const eventRoutes = require('./routes/event');
const ticketRoutes = require('./routes/ticket');
const discussionRoutes = require('./routes/discussion');
const pollRoutes = require('./routes/poll');

// Initialize
const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Initialize Web3 (loads contract)
web3Service.init();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/club', clubRoutes);
app.use('/api/event', eventRoutes);
app.use('/api/ticket', ticketRoutes);
app.use('/api/discussion', discussionRoutes);
app.use('/api/poll', pollRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Server Error' });
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));