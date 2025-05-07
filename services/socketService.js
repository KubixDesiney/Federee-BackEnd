module.exports = (io) => {
    io.on('connection', (socket) => {
      console.log('New client connected');
      
      
      socket.on('joinClub', (clubId) => {
        socket.join(clubId);
      });
      
      
      socket.on('newMessage', ({ clubId, message }) => {
        io.to(clubId).emit('message', message);
      });
      
      
      socket.on('voteUpdate', ({ pollId, results }) => {
        io.emit(`pollUpdate:${pollId}`, results);
      });
      
      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  };