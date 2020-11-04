var _ = require('lodash');
module.exports = function (app) {
    var menuModel = require("../model/menu/menu.model.server.js");
    var path = require('path');
    const multer = require('multer'); // npm install multer --save
    const baseUrl = '';
    //const baseUrl = "http://localhost:8080"

    app.post("/api/restaurant/menu", createDish);
    app.get("/api/menu", findAllDishesForRestaurant);
    app.get("/api/restaurant/menu/:did", findDishById);
    app.put("/api/restaurant/menu/:did", updateDish);
    app.delete("/api/restaurant/menu/:did", deleteDish);
    app.put("/api/restaurant/dish?", reorderDishes);

    var storage = multer.diskStorage({
        destination: __dirname + '/../../dist/web5610/assets/uploads/',
        filename: function (req, file, cb) {
            cb(null,  file.fieldname + '-' + Date.now()+ path.extname(file.originalname));
        }
    });
    const upload = multer({
        storage: storage
    }).single("myFile");
    //UPLOAD
//    app.post ("/api/upload", upload, uploadImage);
//    app.get("/api/image/:imageName", findImage);

    function createDish(req, res) {
        // var pageId = req.params.pageId;
        var dish = _.pick(req.body, ["dish_name",  "description", "url", "price"]);
        console.log(dish);
        console.log(req.body);
        menuModel.createDish(dish).then(
            function (dish) {
                if (dish) {
                    res.json(dish);
                } else {
                    res.status(200).send({});
                }
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function findAllDishesForRestaurant(req, res) {

        menuModel.findAllDishes().then(
            function (dish) {
                res.json(dish);
                console.log(dish);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function findDishById(req, res) {
        var dishId = req.params['did'];
        menuModel
            .findDishById(dishId)
            .then(function (dish) {
                    res.json(dish);
                },
                function (err) {
                    res.status(404).send(err);
                });
    }

    function updateDish(req, res) {
        var dishId = req.params['did'];
        var updatedDish = _.pick(req.body,["dish_name", "description", "price", "url"]);
        console.log(updatedDish);
        menuModel.updateDish(dishId, updatedDish)
            .then(function (stats) {
                    res.json(stats);
                },
                function (err) {
                    res.status(404).send(err);
                });
    }

    function deleteDish(req, res) {
        var dishId = req.params['did'];
        menuModel.deleteDish(dishId).then(
            function (stats) {
                res.json(stats);
            },
            function (err) {
                res.status(404).send(err);
            }
        );
    }
}
