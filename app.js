require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const web3Service = require('./config/web3');

const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
web3Service.init();
const logger = require('./services/logger');

app.use((err, req, res, next) => {
  logger.error(`${err.status || 500} - ${err.message}`);
  next(err);
});

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
console.log('authRoutes:',    require('./routes/auth'));
console.log('clubRoutes:',    require('./routes/clubs'));
console.log('eventRoutes:',   require('./routes/events'));
console.log('votingRoutes:',  require('./routes/voting'));
app.use('/api/auth',    require('./routes/auth')); 
app.use('/api/events', require('./routes/events'));
app.use('/api/clubs', require('./routes/clubs'));
app.use('/api/voting', require('./routes/voting'));

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;