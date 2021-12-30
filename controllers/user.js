const User = require("../models/user");
const jwt = require("jsonwebtoken") // to generate signed token
const expressJwt = require("express-jwt") // for authorization check
const { errorHandler } = require("../helpers/dbErrorHandler")

var signup = (req, res) => {
    console.log("req.body", req.body);
    let user = new User(req.body);
    user.save((err, user) => {
        if(err) {
            return res.status(400).json({
                err : errorHandler(err)
            })
        }
        res.json({
            user
        });
    })
}


exports.signin = (req, res) => {
    // find the user based on email
    const {email, password} = req.body;
    User.findOne({ email }, (err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error : "User with this email does not exist. Please signup."
            })
        }
        // if user is found make sure email and password match
        // generate authenticate method in user model
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Incorrect email id or password"
            })
        }

        // generate a signed token with user id and secret
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        // persist the token as 't' in cookies with expiry date
        res.cookie('t', token, { expire: new Date() + 9999 });
        // return response with user and token to frontend client
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, name, email, role }})
    })
};


exports.signout = (req, res) => {
    res.clearCookie('t');
    res.json({ message: "Successfully signed out" })
}

module.exports = signup