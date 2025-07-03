// const express = require('express');
// const productRoutes = require('../routes/products');
// const errorHandler = require('../middleware/errorHandler');
// const connectDB = require('../lib/dbConn');

// connectDB(); // Initialize DB connection

// const app = express();
// app.use(express.json());
// app.use('/register', require('../routes/register'))
// app.use('/api/products', productRoutes);
// app.use(errorHandler); // Catch any thrown errors

// module.exports = app;
require('dotenv').config();
const  cloudinary = require('cloudinary').v2;
const path = require('path');
const cors = require('cors');
const corsOptions = require('../config/corsOptions')
const {logger} = require('../middleware/logEvents');
const  errorHandler = require('../middleware/errorHandler');
const verifyJWT = require('../middleware/verifyJWT')
const cookieParser = require('cookie-parser');
const credentials = require('../middleware/credentials');
const productRoutes = require('../routes/products');
const authRoutes = require('../routes/auth')
const mongoose = require('mongoose');
const connectDB = require('../lib/dbConn')
// const PORT = process.env.PORT || 3500;

connectDB();
//  Connect to MongoDB`
const express = require('express');
const app = express();

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement 
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

//  built-in middleware to handle urlencoded data
app.use(express.urlencoded({extended: false}))

// build-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());
// serve static files
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/uploads', express.static('uploads'));

// routes
app.use('/api/', require('../routes/root'))
app.use('/api/register', require('../routes/register'))
app.use('/api/auth', authRoutes )
app.use('/api/logout', require('../routes/logout'))
app.use('/api/products', productRoutes);
app.use('/api/cart', require('../routes/cart'));
app.use('/api/image', require('../routes/upload'))
app.use('/api/refresh', require('../routes/refresh'))
app.use('/api/order', require('../routes/order'));
app.use(verifyJWT)

app.use(errorHandler); 
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')})
    
module.exports = app;