require('dotenv').config();
const express = require('express');
const  cloudinary = require('cloudinary').v2;
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions')
const {logger} = require('./middleware/logEvents');
const  errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT')
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./lib/dbConn')
// const PORT = process.env.PORT || 3500;

//  Connect to MongoDB`
connectDB();
const app = express();

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement 
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

//  built-in middleware to handle urlencoded data
// app.use(express.urlencoded({extended: false}))

// build-in middleware for json
app.use(express.json());

// middleware for cookies
// app.use(cookieParser());
// serve static files
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/uploads', express.static('uploads'));

// routes
app.use('/', require('./routes/root'))
app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth'))
app.use('/logout', require('./routes/logout'))
app.use('/products', require('./routes/products'));
app.use('/cart', require('./routes/cart'));
app.use('/image', require('./routes/upload'))
app.use('/refresh', require('./routes/refresh'))
app.use('/order', require('./routes/order'));
// app.use(verifyJWT)

app.use(errorHandler); 
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')})
    
module.exports = app;
