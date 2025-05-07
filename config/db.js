const mongoose = require('mongoose');

module.exports = async function connectDB() {
  console.log('🧪 MONGO_URI:', process.env.MONGO_URI);
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};