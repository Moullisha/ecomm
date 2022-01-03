const express = require('express');
const router = express.Router();
const { signup, signin, signout } = require("../controllers/auth");
const { userSignupValidator } = require("../validator/index")

console.log("Inside routes")
router.post('/signup', userSignupValidator, function(req, res) {
    console.log("Inside routes/user")
    signup;
})

router.post('/signin', (req, res) => {
    signin
});
router.get('/signout', (req, res) => {
    signout
});
router.get('/hello', (req, res) => {
    res.send("hello there")
})

module.exports = router;