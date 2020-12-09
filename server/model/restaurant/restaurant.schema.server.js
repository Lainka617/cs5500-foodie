
var mongoose = require('mongoose');

var restaurantSchema = mongoose.Schema(
    {
        name: String,
        email: String,
        address1: String,
        address2: String,
        city: String,
        state: String,
        zip: String,
        phone: String,
        description: String,
        dateCreated: {
            type: Date,
            default: Date.now()
        },
        menu: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'menu'
        }],

    }, {collection: "restaurant"}
);

module.exports = restaurantSchema;