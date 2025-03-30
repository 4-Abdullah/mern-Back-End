const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
        // useNewUrlParser and useUnifiedTopology are now deprecated in MongoDB Node.js Driver v4.0.0+, and they don’t have any effect anymore.
                // useUnifiedTopology: true,
                // useNewUrlParser: true
        });
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB