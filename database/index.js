const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/zagat', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('mongoose is connected!');
});

module.exports = db;
