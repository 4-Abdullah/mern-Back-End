const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/orderController')
const ROLES_LIST = require('../../config/roles_list')
const verfiyRoles = require('../../middleware/verifyRoles')

router.route('/')
    .get(orderController.getOrder)

router.route('/:id')
    .post(orderController.addtoOrder)

router.route('/Orderlength')
    .get(orderController.getOrderlength)
    
router.route('/removefromOrder')
    .post(orderController.removefromOrder)

router.route('/increaseProductQuantity')
    .post(orderController.increaseProductQuantity)
    
router.route('/decreaseProductQuantity')
    .post(orderController.decreaseProductQuantity)
module.exports = router