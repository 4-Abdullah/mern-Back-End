// const { options } = require('../routes/root');
// const allowedOrigins = require('./allowedOrigins')

const allowedOrigins = [
    'https://mern-admin-dashboard-phi.vercel.app',
    'https://front-end-lemon-seven.vercel.app'
];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions 