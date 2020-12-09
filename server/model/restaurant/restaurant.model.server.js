var mongoose = require('mongoose');
var RestaurantSchema = require('./restaurant.schema.server.js');
var Restaurant = mongoose.model('Restaurant', RestaurantSchema);

Restaurant.createRestaurant = createRestaurant;
Restaurant.findRestaurant = findRestaurant;
Restaurant.updateRestaurant = updateRestaurant;
Restaurant.findRestaurantByName=findRestaurantByName;
Restaurant.findRestaurantByZipcode=findRestaurantByZipcode;
Restaurant.findRestaurantById=findRestaurantById;
module.exports = Restaurant;

    function createRestaurant(restaurant) {
        return Restaurant.create(restaurant);
    }

    function findRestaurant() {
        return Restaurant.find();
    }

    function updateRestaurant(restaurantId, restaurant) {
        console.log('backend: update dish!')
        return Restaurant.findByIdAndUpdate(restaurantId, restaurant, {new: true});
    }

    function findRestaurantByName(name) {
        return Restaurant.find({"name": {'$regex' : '.*' + name + '.*'}});
    }

    function findRestaurantByZipcode(zip) {
        return Restaurant.find({"zip": zip});
    }

    function findRestaurantById(id) {
        return Restaurant.find({"_id": id});
    }