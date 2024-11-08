const Blog = require('../models/blogModel');
const multer = require('multer');

// Set up multer for file uploads
const storage = multer.memoryStorage(); // Store the file in memory for BLOB
const upload = multer({ storage: storage }).single('image'); // Expects 'image' as the field name for the uploaded file

// Function to fetch all blogs
const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find(); // Fetch all blog posts in MongoDB

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
        console.error("Error fetching blogs:", error);
        res.status(500).json({ message: error.message });
    }
};



// Function to create a new blog post
const createBlog = async (req, res) => {
    const { title, date, author, content } = req.body;

    // Ensure the image has been uploaded
    if (!req.file) {
        return res.status(400).json({ message: "Image file is required." });
    }

    // Convert the image buffer to BLOB format
    const image = req.file.buffer; // Get the image data from memory storage

    if (!title || !date || !author || !content) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const newBlog = await Blog.create({ title, date, author, content, image });
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Function to handle image upload (if needed)
const uploadImage = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json({ filePath: req.file.buffer });
    });
};

// Function to delete a blog post by ID
const deleteBlog = async (req, res) => {
    const { id } = req.params; // Get blog ID from request parameters

    try {
        // Make sure you're calling the correct method to delete the blog
        const deletedBlog = await Blog.findByIdAndDelete(id); // Find the blog by ID and delete it
        
        if (!deletedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({ message: "Error deleting blog", error: error.message });
    }
};


module.exports = { getBlogs, createBlog, uploadImage, deleteBlog };
