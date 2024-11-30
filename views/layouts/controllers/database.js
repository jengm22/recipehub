// 

const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Retrieve the MongoDB URI from environment variables
const mongoURI = process.env.MONGODB_URI;

// Validate the MongoDB URI
if (!mongoURI) {
  console.error('Error: MONGODB_URI is not defined in environment variables.');
  process.exit(1); // Exit the application if the URI is missing
}

// Function to connect to MongoDB
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('🚀 Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // Exit the application if the connection fails
  }
};

// Invoke the connection function
connectToMongoDB();

// Optional: Handle Mongoose connection events
const db = mongoose.connection;
db.on('error', (error) => console.error('Connection error:', error));
db.once('open', () => {
  console.log('MongoDB connection established successfully');
});

// Import your models
require('./Category');
require('../routes/Recipe');
