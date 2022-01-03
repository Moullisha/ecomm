const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true,
        maxLength: 100,
        trim: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 2000,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    category: {
        type: ObjectId,
        ref: 'Category',
        required: true
    },
    quantity: {
        type: Number,
    },
    photo: {
        type: Buffer,
        contentType: String
    },
    shipping: {
        type: Boolean,
        required: false
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model("Product", productSchema)