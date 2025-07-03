const mongoose = require('mongoose');

const MONGODB_URI = process.env.DATABASE_URI;
if (!MONGODB_URI) throw new Error('Please define MONGODB_URI');

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (global.mongoose.conn) return global.mongoose.conn;

  if (!global.mongoose.promise) {
    global.mongoose.promise = mongoose.connect(MONGODB_URI, {
  useNewUrlParser:          true,
  useUnifiedTopology:       true,
});
    mongoose.connection.on('connected', () =>
      console.log('MongoDB connected')
    );
    mongoose.connection.on('error', err =>
      console.error('MongoDB connection error:', err)
    );
  }

  global.mongoose.conn = await global.mongoose.promise;
  return global.mongoose.conn;
}

module.exports = connectDB;