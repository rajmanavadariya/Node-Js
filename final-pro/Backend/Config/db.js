const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://127.0.0.1:27017/mern', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB Connected....');
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err);
  });

module.exports = db;
