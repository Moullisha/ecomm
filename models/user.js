const mongoose = require('mongoose'); // for creating schema
const crypto = require('crypto');  // for hashing password
const { v1 : uuidv1 } = require('uuid'); // to generate unique string
// uuidv1();

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        trim: true,
    },
    salt: String, // for hashed password
    role: { // 0 - user, 1 - admin
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    }
}, { timestamps: true}
);


// virtual field
userSchema.virtual('password')
.set(function(password) {
    this._password = password
    this.salt = uuidv1()
    this.hashedPassword = this.encryptPassword(password)
})
.get(function() {
    return this._password
})


// adding methods to Schema's methods object
userSchema.methods = {
    // authenticates if the password entered by user matched the hashed password or not after encrypting
    authenticate: function(plainPassword) {
        return this.encryptPassword(plainPassword) === this.hashedPassword;
    },

    encryptPassword: function(password) {
        if(!password){
            return "";
        }
        
        try {
            return crypto.createHmac("sha1", this.salt)
                         .update(password)
                         .digest("hex");
        }

        catch (err) {
            return "";
        }
    }
};

module.exports = mongoose.model("User", userSchema);