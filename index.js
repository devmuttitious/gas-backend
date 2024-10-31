const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const multer = require('multer');

const poetryRoutes = require('./routes/poetryRoute');
const ghazalRoutes = require('./routes/ghazalRoute');
const inqlabiPoetryRoutes = require('./routes/inqlabiPoetryRoute');
const blogRoutes = require('./routes/blogRoute');
const blogDetailsRoute = require('./routes/blogDetailsRoute');

// Increase the limit here (e.g., to 10MB)
const jsonParser = bodyParser.json({ limit: '10mb' });
const urlencodedParser = bodyParser.urlencoded({ limit: '10mb', extended: true });

require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Use the middleware
app.use(jsonParser);
app.use(urlencodedParser);

// Middleware
app.use(express.json());
app.use(cors());

// Configure Nodemailer with environment variables
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your email from .env file
        pass: process.env.EMAIL_PASS  // Your email password or app-specific password from .env
    }
});

// Routes
app.use('/api/poetry', poetryRoutes);
app.use('/api/ghazals', ghazalRoutes);
app.use('/api/inqlabi-poetry', inqlabiPoetryRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/blogs/details', blogDetailsRoute);



// Contact form routes
app.post('/api/contact', async (req, res) => {
    
    const { name, email, phone, subject, message } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,  // Send from your email
        to: process.env.EMAIL_RECEIVER, // Replace with the receiving email from .env
        subject: `New Message: ${subject}`,
        html: `<p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Phone:</strong> ${phone}</p>
               <p><strong>Message:</strong> ${message}</p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send message.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
