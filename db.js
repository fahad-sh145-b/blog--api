const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.MONGODB_URL;

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', () => console.log('Connected to MongoDB Atlas'));
db.on('error', (err) => console.error('MongoDB error:', err));
db.on('disconnected', () => console.log('MongoDB disconnected'));

module.exports = db;
