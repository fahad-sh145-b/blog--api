


const mongoose = require('mongoose');

// ✅ include database name at the end (important!)
const mongoURL ='mongodb://localhost:27017/blogapi'

// connect to MongoDB
mongoose.connect(mongoURL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
});

// get default connection
const db = mongoose.connection;

// event listeners
db.on('connected', () => {
  console.log('✅ Connected to MongoDB server');
});

db.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

db.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected');
});

module.exports = db;
