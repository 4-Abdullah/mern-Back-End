// const { options } = require('../routes/root');
// const allowedOrigins = require('./allowedOrigins')

const allowedOrigins = [
    'https://mern-admin-dashboard-phi.vercel.app',
    'https://front-end-lemon-seven.vercel.app'
];

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (e.g., Postman or server-side scripts)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Allow the request
        } else {
            console.log('Blocked by CORS:', origin); // Log the blocked origin
            callback(new Error('Not allowed by CORS')); // Reject the request
        }
    },
    credentials: true, // Allow credentials such as cookies and headers
    optionsSuccessStatus: 200 // For legacy browsers that expect status 200
}


// const corsOptions = {
//     origin: (origin, callback) => {
//         console.log("Origin Attempt:", origin);
//         if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//         // if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true)
//         } else {
//             console.log('Blocked by CORS:', origin);
//             callback(new Error('Not allowed by CORS'))
//         }
//     },
//     credentials: true,
//     optionsSuccessStatus: 200
// } 

module.exports = corsOptions;