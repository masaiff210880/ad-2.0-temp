const express = require('express');
const router = express.Router();
const userOrderController = require('../controller/user.order.controller');
const verifyToken = require('../middleware/verifyToken');


//get a order by id
router.get('/:id', userOrderController.getOrderById);

//get all order by a user
router.get('/',verifyToken, userOrderController.getOrderByUser);

module.exports = router;
