// blogDetailsController.js
const Blog = require('../models/blogModel'); // Reference the existing Blog model

// Function to fetch a specific blog by ID
const getBlogDetails = async (req, res) => {
    const { id } = req.params; // Get the blog ID from request parameters

    try {
        const blog = await Blog.findById(id); // Find the blog by its MongoDB ID
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        // Convert image buffer to Base64 if image exists
        const blogWithBase64Image = {
            ...blog.toObject(),
            image: blog.image ? blog.image.toString('base64') : null,
        };

        res.json(blogWithBase64Image); // Send the blog details as response
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getBlogDetails };
