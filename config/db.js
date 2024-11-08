// backend/config/db.js
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

// MongoDB connection string
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://abbass-saghar:880Abbass@cluster0.oscplab.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// MongoDB connection function
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully.');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
