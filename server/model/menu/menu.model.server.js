var mongoose = require('mongoose');
var menuSchema = require('./menu.schema.server.js');
var Menu = mongoose.model('Menu', menuSchema);

Menu.createDish = createDish;
Menu.findAllDishes = findAllDishes;
Menu.findDishById = findDishById;
Menu.updateDish = updateDish;
Menu.deleteDish = deleteDish;

module.exports =Menu;

function createDish(dish) {
    return Menu.create(dish);
}

function findAllDishes() {
    return Menu.find({}).sort({ position: 1, dateCreated: 1});
}

function findDishById(dishId) {
    return Menu.findById(dishId);
}

function updateDish(dishId, dish) {
    console.log('backend: update dish!')
    return Menu.findByIdAndUpdate(dishId, dish, {new: true});
}

function deleteDish(dishId) {
    Menu.findById(dishId, function (err, foundDish) {
        var index = foundDish.position;
        resetDishes(index);
    });
    return Menu.findByIdAndRemove(dishId);
}
