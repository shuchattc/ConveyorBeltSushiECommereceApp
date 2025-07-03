const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodItemSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    category: String,
});

module.exports = mongoose.model('Foods', FoodItemSchema);