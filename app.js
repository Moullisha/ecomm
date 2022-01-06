const express = require('express');
const req = require('express/lib/request');
require('dotenv').config(); // to use .env variables
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require("express-validator");
const cors = require("cors");

// importing routes
const authRoutes = require("./routes/auth");
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')



// app
const app = express();

// db connection
mongoose.connect(process.env.DATABASE)
.then(() => {
    console.log("DB connected");
})


// middlewares
app.use(morgan("dev"))
app.use(bodyParser.json()) // to convert req body into json object
app.use(cookieParser)
app.use(expressValidator())
app.use(cors()); // required to handle incoming requests from a different port

// routes middleware
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})

// require('http').createServer(app).listen(port, () => {
//     console.log(`Server running on port ${port}`)
// })

console.log("Inside app.js")

