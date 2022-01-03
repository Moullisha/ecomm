const formidable = require('formidable') // module for parsing incoming form data, especially file uploads. IN this case we're using it for image uploaded for a product
const _ = require('lodash')
const Product = require('../models/product')
const fs = require('file-system')
const { errorHandler } = require('../helpers/dbErrorHandler')

exports.productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if(err || !product){
            return res.status(400).json({
                error: "Product not found"
            })
        }
        req.product = product;
        next();
    })
}

// returns a product based on product id 
exports.read = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
}

exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Image cannot be uploaded"
            })
        }

        
        //check if all fields are present
        const { name, descriptiom, price, category, quantity, shipping } = fields;

        if(!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: "All fields are mandatory"
            })
        }
        let product = new Product(fields);

        if(files.photo) {
            if(files.photo.size > 1000000){
                return res.status(400).json({
                    error: "File size should be less than 1 MB"
                })
            }

            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }

        product.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }

            res.json({ result })
        })
    })
}

exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Image cannot be uploaded"
            })
        }

        
        //check if all fields are present
        const { name, description, price, category, quantity, shipping } = fields;

        if(!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: "All fields are mandatory"
            })
        }
        let product = req.product;
        product = _.extend(product, fields)

        if(files.photo) {
            if(files.photo.size > 1000000){
                return res.status(400).json({
                    error: "File size should be less than 1 MB"
                })
            }

            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }

        product.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }

            res.json({ result })
        })
    })
}

exports.removeProduct = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
         
        res.json({
            message: "Product deleted successfully "
        })
    })
}