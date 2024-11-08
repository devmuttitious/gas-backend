const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');

// Rate limiting to prevent abuse
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: "Too many requests, please try again later."
});

// Nodemailer Configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,       // Your email from .env file
        pass: process.env.EMAIL_PASS        // Your email password from .env
    }
});

// Contact Form Route
router.post('/', contactLimiter, async (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_RECEIVER,
        subject: `New Message: ${subject}`,
        html: `
            <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.5;">
                    <h2>New Message from Contact Form</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Message:</strong> <br>${message}</p>
                </body>
            </html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error); // For debugging
        res.status(500).json({ message: 'Sorry, we encountered an issue. Please try again later.' });
    }
});

module.exports = router;
