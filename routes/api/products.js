const express = require('express');
const router = express.Router();
const multer = require('multer');
const verifyJWT = require('../../middleware/verifyJWT')
const productController = require('../../controllers/productController')
const ROLES_LIST = require('../../config/roles_list')
const verfiyRoles = require('../../middleware/verifyRoles')
// Multer configuration for handling image uploads
const upload = multer({ storage: multer.memoryStorage() });
router.route('/')
    .get(productController.getAllProducts)

router.route('/category')
    .get(productController.getProductsbyCategory)

router.route('/:id')
    .get(productController.getProduct);

router.route('/')
    .post(upload.any({name: 'file0'}),productController.createNewProduct)
    .put(upload.single('image'),productController.updateProduct) 
    .delete(productController.deleteProduct)

    router.use(verifyJWT)
    // .post(verfiyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),upload.any({name: 'file0'}),productController.createNewProduct)
    // .put(verfiyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),upload.single('image'),productController.updateProduct) 
    // .delete(verfiyRoles(ROLES_LIST.Admin),productController.deleteProduct)

   



module.exports = router
