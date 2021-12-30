const User = require("../models/user");

var signup = (req, res) => {
    console.log("req.body", req.body);
    let user = new User(req.body);
    user.save((err, user) => {
        if(err) {
            return res.status(400).json({
                err
            })
        }
        res.json({
            user
        });
    })
}

module.exports = signup