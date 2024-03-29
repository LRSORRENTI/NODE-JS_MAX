const path = require('path');

const express = require('express');

const { check, body } = require('express-validator/check');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get('/products', isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', [
// check('title')
body('title')
.isAlphanumeric()
.isLength( {min: 2} )
.trim(),
body('imageUrl')
.isURL()
.trim(),
body('price')
.isFloat()
.trim(),
body('description')
.isLength( {min: 3, max: 1000} )
.trim()

],

isAuth, adminController.postAddProduct);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product',
[
    // check('title')
    body('title')
    .isString()
    .isLength( {min: 2} )
    .trim(),
    body('imageUrl')
    .isURL()
    .trim(),
    body('price')
    .isFloat()
    .trim(),
    body('description')
    .isLength( {min: 3, max: 1000} )
    .trim()
    
    ],
 isAuth, adminController.postEditProduct);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;
