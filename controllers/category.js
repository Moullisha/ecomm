const Category = require('../models/category')
const { errorHandler } = require('../helpers/dbErrorHandler')

exports.create = (req, res) => {
    const category = new Category();
    category.save((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({ data }) //since the key and the value names are same only the name of the value can be specified
    })
}


// returns category based on category id
exports.readCategory = (req, res) => {
    return res.json(req.category)
}


exports.updateCategory = (req, res) => {
    const category = req.category;
    category.name = req.body.name;
    category.save((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        res.json(data);
    })
}

exports.deleteCategory = (req, res) => {
    const category = req.category;
    category.remove((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: "Category deleted successfully!"
        })
    })
}


exports.listCategories = (req, res) => {
    Category.find().exec((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data)
    })
}

//middleware to find a category whenever category id parameter is present in the request
exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if(err) {
            return res.status(400).json({
                error: "Category does not exist"
            })
        }
        req.category = category;
        next();
    })
}