const User = require('../models/user')

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: "User not found"
            })
        }

        // if user found, store the user details in req as profile
        req.profile = user;
        next();
    })
}

exports.viewProfile = (req, res) => {
    req.profile.hashedPassword = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
}

exports.updateProfile = (req, res) => {
    User.findOneAndUpdate(
        { _id: req.profile._id},
        { $set: req.body },
        {new: user},
        (err, user) => {
            if(err) {
                return res.status(400).json({
                    error: "You are not authorized to perform this action"
                })
            }

            user.hashedPassword = undefined;
            user.salt = undefined;
            res.json(user);
        }
    )
}