const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables
const connectDB = require('./config/db'); // MongoDB connection

// Route Imports
const poetryRoutes = require('./routes/poetryRoute');
const ghazalRoutes = require('./routes/ghazalRoute');
const inqlabiPoetryRoutes = require('./routes/inqlabiPoetryRoute');
const blogRoutes = require('./routes/blogRoute');
const blogDetailsRoute = require('./routes/blogDetailsRoute');
const galleryRoutes = require('./routes/galleryRoute');
const contactRoute = require('./routes/contactRoute');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// MongoDB Connection
connectDB();

// Root Endpoint
app.get('/', (req, res) => {
    res.send('Welcome to the API!'); // Welcome message
});

// API Routes
app.use('/api/poetry', poetryRoutes);
app.use('/api/ghazals', ghazalRoutes);
app.use('/api/inqlabi-poetry', inqlabiPoetryRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/blogs/details', blogDetailsRoute);
app.use('/api/gallery', galleryRoutes);
app.use('/api/contact', contactRoute);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
