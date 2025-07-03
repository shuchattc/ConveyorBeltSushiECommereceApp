const mongoose = require('mongoose');
const FoodItems = require('./foodItems');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
        qty: Number,
        FoodItems: [
        {
            type: Schema.Types.ObjectId,
            ref: 'foods'
        }
    ]
});

module.exports = mongoose.model('orders', OrderSchema);