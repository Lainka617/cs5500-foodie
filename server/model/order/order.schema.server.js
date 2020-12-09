var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    dishes: [{
        dish: String,
        price: Number,
        quantity: Number,
    }],
    restaurantId: String,
    total:Number,
    user: String,
    userId: String,
    deliverId: String,
    status: Number,
    address1: String,
    address2: String,
    city: String,
    state: String,
    zip: String,
    phone:String,
    time: {type: Date, default: Date.now()}
}, {collection: 'order'});

module.exports = orderSchema;
