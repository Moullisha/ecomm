const express = require('express');
const router = express.Router();

const { requireSignIn, isAdmin, isAuth } = require('../controllers/auth')
const { userById, viewProfile, updateProfile } = require('../controllers/user')

router.get('/secret/:userId', requireSignIn, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    })
})

router.get('user/:userId', requireSignIn, isAuth, viewProfile);
router.put('user/:userId', requireSignIn, isAuth, updateProfile);


router.param('userId', userById);

module.exports = router;