var _ = require('lodash');
module.exports = function(app) {
    // db
    const restaurantModel = require('../model/restaurant/restaurant.model.server');
    // api list
    app.post('/api/restaurant/createrestaurant', createRestaurant);
    app.get('/api/restaurant/findallrestaurant', findAllRestaurant);
    app.get('/api/restaurant/findrestaurantbyzip/:zipCode', findRestaurantByZipcode);
    app.get('/api/restaurant/findrestaurantbyname/:restaurantName', findRestaurantByName);
    app.get('/api/restaurant/findrestaurantbyid/:restaurantId', findRestaurantById);
    app.put('/api/restaurant/updateRestaurant/:restaurantId', updateRestaurant);

    function createRestaurant(req, res) {
        var restaurant = req.body;
        console.log(restaurant);
        restaurantModel.createRestaurant(restaurant)
            .then(function (restaurant) {
                res.status(200).json(restaurant);
            },
            function (err) {
                console.log('create restaurant error! ' + err);
                res.status(400).send(err);
            });
    }

    function findAllRestaurant(req, res) {
        console.log('call function findallrestaurant');
        restaurantModel.findRestaurant()
            .then(function (restaurant) {
                if(restaurant == null){
                    res.status(404).send();
                }
                else {
                    res.status(200).json(restaurant);
                }
            },
            function (err) {
                console.log('find restaurant error! ' + err);
                res.status(400).send(err);
            });
    }

    function findRestaurantByZipcode(req, res) {
        var zip = req.params['zipCode'];
        restaurantModel.findRestaurantByZipcode(zip)
            .then(function (restaurant) {
                if(restaurant == null){
                    res.status(404).send();
                }
                else {
                    res.status(200).json(restaurant);
                }
            },
            function (err) {
                console.log('find restaurant error! ' + err);
                res.status(400).send(err);
            });
    }

    function findRestaurantByName(req, res) {
        var name = req.params['restaurantName'];
        restaurantModel.findRestaurantByName(name)
            .then(function (restaurant) {
                if(restaurant == null){
                    res.status(404).send();
                }
                else {
                    res.status(200).json(restaurant);
                }
            },
            function (err) {
                console.log('find restaurant error! ' + err);
                res.status(400).send(err);
            });
    }

    function findRestaurantById(req, res) {
        var id = req.params['restaurantId'];
        restaurantModel.findRestaurantById(id)
            .then(function (restaurant) {
                if(restaurant == null){
                    res.status(404).send();
                }
                else {
                    res.status(200).json(restaurant);
                }
            },
            function (err) {
                console.log('find restaurant error! ' + err);
                res.status(400).send(err);
            });
    }

    function updateRestaurant(req, res) {
        var restaurant = _.pick(req.body, ["name",  "email", "address1", "address2",  "city", "state", "zip", "phone", "description"]);
        var restaurantId = req.params['restaurantId'];
        restaurantModel.updateRestaurant(restaurantId, restaurant)
            .then(function (restaurant){
                res.json(restaurant);
            },
            function (err) {
                res.status(404).send(err);
            });
    }

};