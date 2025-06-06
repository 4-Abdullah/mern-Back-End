require('dotenv').config();
const express = require('express');
const  cloudinary = require('cloudinary').v2;
const path = require('path');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions')
const {logger} = require('./middleware/logEvents');
const  errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT')
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn')
const PORT = process.env.PORT || 3500;

//  Connect to MongoDB`
connectDB();

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement 
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));
// app.use(cors('*'));
// app.use(cors({ origin: "https://mern-admin-dashboard-phi.vercel.app", credentials: true }));
// app.use(cors({ origin: "https://front-end-lemon-seven.vercel.app", credentials: true }));
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
app.use('/', require('./routes/root'))
app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth'))
app.use('/logout', require('./routes/logout'))
app.use('/products', require('./routes/api/products'));
app.use('/cart', require('./routes/api/cart'));
app.use('/image', require('./routes/api/upload'))
app.use('/refresh', require('./routes/refresh'))
app.use('/order', require('./routes/api/order'));
app.use(verifyJWT)


// app.all('*', (req, res) => {
//     res.status(404)
//     if(req.accepts('html')){
//         res.sendFile(path.join(__dirname, 'views', '404.html'));
//     }else if(req.accepts('json')) {
//         res.json({error: "404 Not Found"});
//     }else {
//         res.type('txt').send('404 not Found');
//     }
    
// })

// app.use('/employees', require('./routes/api/employees'));
// app.use('/')




app.use(errorHandler); 
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})