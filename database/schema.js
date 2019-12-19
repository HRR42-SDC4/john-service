const mongoose = require('mongoose');
const db = require('../database/index.js');


const restaurantSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  articles: [Object],
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
