module.exports = function(app) {
    // db
    const orderModel = require('../model/order/order.model.server');
    // api list
    app.post('/api/user/:userId/order', createOrder);
    app.post('/api/user/:userId/order/:orderId/checkout', checkoutOrder);
    app.post('/api/user/:userId/order/:orderId/post', postOrder);
    app.post('/api/deliver/:deliverId/order/:orderId/accept', acceptOrder);
    app.post('/api/deliver/:deliverId/order/:orderId/complete', completeOrder);
    app.post('/api/user/:userId/order/:orderId/cancel', cancelOrder);

    app.get('/api/user/:userId/orders', findOrdersByUser);
    app.get('/api/deliver/:deliverId/orders', findOrdersByDeliver);
    app.get('/api/order/:orderId', findOrderById);
    app.get('/api/user/:userId/cartorders', findCartorderByUser);
    app.get('/api/deliver/:deliverId/intransitorder', findIntransitOrderByDeliver);
    app.get('/api/user/:userId/intransitorder', findIntransitOrderByUser);
    app.get('/api/allpendingorders', findAllPendingOrders);
    app.get('/api/order/restaurant/:restaurantId', findOrdersByRestaurantId);
    app.get('/api/allcurrentorders/', findAllCurrentOrders);
    app.get('/api/order/status/:status', findOrdersByStatus);
    app.get('/api/order/status/:status/restaurant/:restaurantId', findOrderByStatusAndRestaurant);

    app.put('/api/user/:userId/order/:orderId', updateOrder);// also check status if finished or not.
    app.delete('/api/user/:userId/order/:orderId', deleteOrder);


    // function list
    function findOrdersByStatus(req,res) {
        var status = req.params['status'];
        orderModel.findOrdersByStatus(status)
            .then(function (orders) {
                if(orders == null){
                    res.status(200).send([]);
                }
                else {
                    res.status(200).json(orders);
                }
            },
                function (err) {
                    console.log('create order error! ' + err);
                    res.status(400).send(err);
                });

    }
    function createOrder(req, res) {
        var order = req.body;
        var userId = req.params['userId'];
        order.status = 0;
        orderModel.createOrder(userId, order)
            .then(function (order) {
                res.status(200).json(order);
            },
            function (err) {
                console.log('create order error! ' + err);
                res.status(400).send(err);
            });
    }

    function checkoutOrder(req,res) {
        var orderId = req.params['orderId'];
        console.log(orderId);
        orderModel.updateOrderStatus(null, orderId, 1)
            .then(function (order) {
                if(order == null){
                    res.status(404).send();
                }
                else {
                    res.status(200).json(order);
                }
            },
            function (err) {
                console.log('create order error! ' + err);
                res.status(400).send(err);
            });
    }

    function postOrder(req,res) {
        var orderId = req.params['orderId'];
        orderModel.updateOrderStatus(null, orderId, 2)
            .then(function (order) {
                if(order == null){
                    res.status(404).send();
                }
                else {
                    res.status(200).json(order);
                }
            },
            function (err) {
                console.log('create order error! ' + err);
                res.status(400).send(err);
            });
    }

    function acceptOrder(req,res) {
        var deliverId = req.params['deliverId'];
        var orderId = req.params['orderId'];
        orderModel.findOrdersByDeliverAndStatus(deliverId, 3).then(
            function (order) {
                if(order && order.length > 0){
                    console.log(order.length);
                    res.status(403).send({message: 'you already have and intransit order'});
                }
                else{
                    orderModel.updateOrderStatus(deliverId, orderId, 3)
                        .then(function (order) {
                            if(order == null){
                                res.status(404).send();
                            }
                            else {
                                res.status(200).json(order);
                            }
                        },
                        function (err) {
                            console.log('create order error! ' + err);
                            res.status(400).send(err);
                        });
                }
            }
        )
    }

    function completeOrder(req,res) {
        var deliverId = req.params['deliverId'];
        var orderId = req.params['orderId'];
        orderModel.updateOrderStatus(deliverId, orderId, 4)
            .then(function (order) {
                if(order == null){
                    res.status(404).send();
                }
                else {
                    res.status(200).json(order);
                }
            },
            function (err) {
                console.log('create order error! ' + err);
                res.status(400).send(err);
            });
    }

    function cancelOrder(req,res) {
        var orderId = req.params['orderId'];
        orderModel.updateOrderStatus(null, orderId, 5)
            .then(function (order) {
                if(order == null){
                    res.status(404).send();
                }
                else {
                    res.status(200).json(order);
                }
            },
            function (err) {
                console.log('create order error! ' + err);
                res.status(400).send(err);
            });
    }

    function findOrdersByUser(req, res) {
        const userId = req.params['userId'];
        orderModel.findAllOrdersByUser(userId)
            .then(function (orders) {
                if(orders == null){
                    res.status(200).send([]);
                }
                else {
                    res.status(200).json(orders);
                }
            },
            function (err) {
                console.log('create order error! ' + err);
                res.status(400).send(err);
            });
    }

    function findOrdersByDeliver(req,res) {
        const deliverId = req.params['deliverId'];
        orderModel.findAllOrdersByDeliver(deliverId)
            .then(function (orders) {
                if(orders == null){
                    res.status(200).send([]);
                }
                else {
                    res.status(200).json(orders);
                }
            },
            function (err) {
                console.log('create order error! ' + err);
                res.status(400).send(err);
            });
    }

    function findOrderById(req, res) {
        var orderId = req.params['orderId'];
        orderModel.findOrderById(orderId)
            .then(function (order) {
                console.log("orderId" + orderId);
                console.log(order);
                if(order == null){
                    res.status(404).send();
                }
                else {
                    res.status(200).json(order);
                }
            },
            function (err) {
                console.log('find order error! ' + err);
                res.status(400).send(err);
            });
    }

    function findOrdersByRestaurantId(req, res) {
        var restaurantId = req.params['restaurantId'];
        orderModel.findOrdersByRestaurantId(restaurantId)
        .then(function (order) {
            if(order == null){
                res.status(404).send();
            }
            else {
                res.status(200).json(order);
            }
        },
        function (err) {
            console.log('create order error! ' + err);
            res.status(400).send(err);
        });
    }

    function updateOrder(req, res) {
        var userId = req.params['userId'];
        var orderId = req.params['orderId'];
        var update_order = req.body;
        //var orderId = order._id;
        orderModel.updateOrder(orderId, update_order)
            .then(function (order) {
                if(order){
                    res.json(order);
                }
                else {
                    res.status(404).send({});
                }
            },
            function (err) {
                console.log('create order error! ' + err);
                res.status(400).send(err);
            });
    }

    function deleteOrder(req, res) {
        var orderId = req.params['orderId'];
        var userId = req.params['userId'];
        orderModel.deleteOrder(userId, orderId)
            .then(function (order) {
                if(order == null){
                    res.status(404).send();
                }
                else {
                    res.status(200).json(order);
                }
            },
            function (err) {
                console.log('create order error! ' + err);
                res.status(400).send(err);
            });
    }

    function findCartorderByUser(req, res){
        var userId = req.params['userId'];
        var status = 0;
        orderModel.findOrdersByUserAndStatus(userId, status)
            .then(function (orders) {
                //console.log(orders.dishes);
                if(orders){
                    res.status(200).send(orders);
                }
                else {
                    res.status(200).json({});
                }
            },
            function (err) {
                console.log('create order error! ' + err);
                res.status(400).send(err);
            });
    }

    function findIntransitOrderByDeliver(req, res){
        var deliverId = req.params['deliverId'];
        var status = 3;
        orderModel.findOrdersByDeliverAndStatus(deliverId, status)
            .then(function (orders) {
                if(orders == null){
                    res.status(200).send();
                }
                else {
                    res.status(200).json(orders);
                }
            },
            function (err) {
                console.log('create order error! ' + err);
                res.status(400).send(err);
            });
    }

    function findIntransitOrderByUser(req, res){
        var userId = req.params['userId'];
        var status = 3;
        orderModel.findOrdersByUserAndStatus(userId, status)
            .then(function (orders) {
                if(orders == null){
                    res.status(200).send();
                }
                else {
                    res.status(200).json(orders);
                }
            },
            function (err) {
                console.log('create order error! ' + err);
                res.status(400).send(err);
            });
    }


    function findAllPendingOrders(req, res){
        orderModel.findOrdersByStatus(2)
            .then(function (orders) {
                if(orders == null){
                    res.status(200).send([]);
                }
                else {
                    res.status(200).json(orders);
                }
            },
            function (err) {
                console.log('create order error! ' + err);
                res.status(400).send(err);
            });
    }
    function findAllCurrentOrders(req,res) {
        orderModel.findOrdersByStatus(1)
            .then(function (orders) {
                    if(orders == null){
                        res.status(200).send([]);
                    }
                    else {
                        res.status(200).json(orders);
                    }
                },
                function (err) {
                    console.log('create order error! ' + err);
                    res.status(400).send(err);
                });
    }

    function findOrderByStatusAndRestaurant(req,res) {
        var restaurantId = req.params['restaurantId'];
        var status = req.params['status'];
        orderModel.findOrdersByStatusAndRestaurant(restaurantId, status)
            .then(function (orders) {
                console.log(restaurantId);
                console.log(orders);

                    if(orders == null){
                        res.status(200).send([]);
                    }
                    else {
                        res.status(200).json(orders);
                    }
                },
                function (err) {
                    console.log('create order error! ' + err);
                    res.status(400).send(err);
                });
    }

};