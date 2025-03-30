// const { options } = require('../routes/root');
// const allowedOrigins = require('./allowedOrigins')
const allowedOrigins = [
    'https://front-end-lemon-seven.vercel.app',
    'https://mern-admin-dashboard-phi.vercel.app',
];

// const allowedOrigins = [
//     'http://localhost:3000',
//     'http://localhost:3500'
// ];

// const corsOptions = {
//     origin: (origin, callback) => {
//         console.log("Origin Attempt:", origin); // Log the incoming origin

//         // Normalize the origin (remove trailing slash if present)
//         const normalizedOrigin = origin ? origin.replace(/\/$/, '') : origin;

//         if (!normalizedOrigin || allowedOrigins.includes(normalizedOrigin)) {
//             callback(null, true); // Allow requests from allowed origins or no origin (e.g., Postman)
//         } else {
//             console.log('Blocked by CORS:', normalizedOrigin); // Log blocked requests
//             callback(new Error('Not allowed by CORS')); // Reject the request
//         }
//     },
//     credentials: true, // Allow cookies and credentials
//     optionsSuccessStatus: 200, // For legacy browsers with default 204 status issues
// };

// module.exports = corsOptions;


const corsOptions = {
    origin: (origin, callback) => {
        console.log("Origin Attempt:", origin);
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        // if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            console.log('Blocked by CORS:', origin);
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
} 

module.exports = corsOptions;