const express = require('express');
const router = express.Router();
const cartController = require('../../controllers/cartController')
const ROLES_LIST = require('../../config/roles_list')
const verfiyRoles = require('../../middleware/verifyRoles')

router.route('/')
    .get(cartController.getCart)
    .post(cartController.addtoCart)

router.route('/Cartlength')
    .get(cartController.getCartlength)

router.route('/removefromCart')
    .post(cartController.removefromCart)

router.route('/increaseCartQuantity')
    .post(cartController.increaseProductQuantity)

router.route('/decreaseCartQuantity')
    .post(cartController.decreaseProductQuantity)
    // .post(verfiyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.User),cartController.decreaseProductQuantity)
module.exports = router