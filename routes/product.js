const express = require('express');
const router = express.Router();

const { create, productById, read, removeProduct, updateProduct, listOfProducts, listRelatedProducts, listCategoryProducts, getProductPhoto } = require('../controllers/product');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth')
const { userById } = require('../controllers/user')

router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);
router.get('/product/:productId', read)
router.delete('/product/:productId/:userId', requireSignin, isAuth, isAdmin, removeProduct)
router.put('/product/:productId/:userId', requireSignin, isAuth, isAdmin, updateProduct)
router.get('/products', listOfProducts);
router.get('/products/related/:productId', listRelatedProducts)
router.get('/products/categories', listCategoryProducts);
router.post("/products/by/search", listBySearch); // post because filters are being sent as part of request body 
router.get('/product/photo/:productId', getProductPhoto);


router.param("userId", userById)
router.param("productId", productById)

module.exports = router;