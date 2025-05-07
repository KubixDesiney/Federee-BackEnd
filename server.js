const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

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