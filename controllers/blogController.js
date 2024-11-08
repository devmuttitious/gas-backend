const Blog = require('../models/blogModel');
const multer = require('multer');

// Set up multer for file uploads
const storage = multer.memoryStorage(); // Store the file in memory for BLOB
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
}).single('image'); // Expects 'image' as the field name for the uploaded file

// Function to fetch all blogs
const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find(); // Fetch all blog posts

        const blogsWithBase64Images = blogs.map(blog => ({
            id: blog._id, // MongoDB uses _id as the primary key
            title: blog.title,
            date: blog.date,
            author: blog.author,
            content: blog.content,
            image: blog.image ? blog.image.toString('base64') : null // Convert image buffer to Base64 string
        }));
        res.json(blogsWithBase64Images);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching blogs.", error: error.message });
    }
};

// Function to create a new blog post
const createBlog = async (req, res) => {
    const { title, date, author, content } = req.body;

    // Ensure the image has been uploaded
    if (!req.file) {
        return res.status(400).json({ message: "Image file is required." });
    }

    // Convert the image buffer to Binary data
    const image = req.file.buffer; // Get the image data from memory storage

    // Validation for missing fields
    if (!title || !date || !author || !content) {
        return res.status(400).json({ message: "All fields (title, date, author, content) are required." });
    }

    // Optional: Validate the date format if required
    const blogDate = new Date(date);
    if (isNaN(blogDate)) {
        return res.status(400).json({ message: "Invalid date format." });
    }

    try {
        const newBlog = new Blog({ title, date: blogDate, author, content, image });
        await newBlog.save(); // Save the new blog to MongoDB
        res.status(201).json(newBlog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating blog.", error: error.message });
    }
};

// Function to handle image upload (if needed)
const uploadImage = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({ message: "Image upload error.", error: err.message });
        }
        res.status(200).json({ filePath: req.file.buffer });
    });
};

// Function to delete a blog post by ID
const deleteBlog = async (req, res) => {
    const { id } = req.params; // Get blog ID from request parameters

    try {
        const blog = await Blog.findById(id); // Find the blog by MongoDB ID
        if (!blog) {
            return res.status(404).json({ message: "Blog not found." });
        }

        await blog.remove(); // Delete the blog from MongoDB
        res.status(200).json({ message: "Blog deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting blog.", error: error.message });
    }
};

module.exports = { getBlogs, createBlog, uploadImage, deleteBlog };
