const express = require('express');
const req = require('express/lib/request');
require('dotenv').config(); // to use .env variables
const mongoose = require('mongoose');
// const router = require('./routes/user');
const userRoutes = require("./routes/user");
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require("express-validator");


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

// routes middleware
app.use('/api', userRoutes)

const port = process.env.PORT || 3000;

// app.listen(port, () => {
//     console.log(`Server is running on ${port}`)
// })

require('http').createServer(app).listen(port, () => {
    console.log(`Server running on port ${port}`)
})

console.log("Inside app.js")


// MONGO_URI = mongodb+srv://Molly:molly7@nodeapi.1qmk9.mongodb.net/nodeapi?retryWrites=true&w=majority