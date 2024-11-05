const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables

// Route Imports
const poetryRoutes = require('./routes/poetryRoute');
const ghazalRoutes = require('./routes/ghazalRoute');
const inqlabiPoetryRoutes = require('./routes/inqlabiPoetryRoute');
const blogRoutes = require('./routes/blogRoute');
const blogDetailsRoute = require('./routes/blogDetailsRoute');
const galleryRoutes = require('./routes/galleryRoute');
const contactRoute = require('./routes/contactRoute');

const app = express();
const PORT = process.env.SERVER_PORT || 3000;



app.use(cors());


app.get('/', (req, res) => {
    res.send('Welcome to the API!'); // Welcome message
});

// Increase JSON and URL-encoded data limits
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Nodemailer Configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,       // Your email from .env file
        pass: process.env.EMAIL_PASS        // Your email password from .env
    }
});

// API Routes
app.use('/api/poetry', poetryRoutes);
app.use('/api/ghazals', ghazalRoutes);
app.use('/api/inqlabi-poetry', inqlabiPoetryRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/blogs/details', blogDetailsRoute);
app.use('/api/gallery', galleryRoutes);
app.use('/api/contact', contactRoute);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



module.exports = app;

