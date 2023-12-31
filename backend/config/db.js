const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

// local url
// const DB_LOCAL_URL = 'mongodb://0.0.0.0:27017/shofy';
// mongodb url
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try { 
    await mongoose.connect(MONGO_URI);
    console.log('mongodb connection success!');
  } catch (err) {
    console.log('mongodb connection failed!', err.message);
  }
};

module.exports = connectDB;
