const express = require('express');
const router = express.Router();

const { create, categoryById, readCategory, updateCategory, deleteCategory, listCategories } = require('../controllers/category');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth')
const { userById } = require('../controllers/user')

router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);
router.get('/category/:categoryId', readCategory)
router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, updateCategory);
router.delete('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, deleteCategory);
router.get('/categories', listCategories)

router.param("userId", userById)
router.param("categoryId", categoryById)

module.exports = router;