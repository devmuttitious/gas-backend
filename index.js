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
const galleryRoutes = require('./routes/galleryRoute');

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
app.use('/api/gallery', galleryRoutes);


// Contact Form Route
app.post('/api/contact', async (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_RECEIVER,
        subject: `New Message: ${subject}`,
        html: `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong> ${message}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send message.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



module.exports = app;

