require('dotenv').config();
const app = require('./app');
const express = require('express');
const cors      = require('cors');
const bodyParser= require('body-parser');
const connectDB = require('./config/db');


const PORT = process.env.PORT || 4000;

connectDB();

const server = app.listen(PORT, () => 
  console.log(`Server running on port ${PORT}`)
);

// WebSocket setup
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

require('./services/socketService')(io);