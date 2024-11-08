const express = require('express');
const { getBlogs, createBlog, deleteBlog } = require('../controllers/blogController');
const router = express.Router();
const multer = require('multer');

// Set up multer for image uploads
const storage = multer.memoryStorage(); // Store images in memory
const upload = multer({ storage }).single('image'); // Expect 'image' field for file upload

// Route to get all blogs
router.get('/', getBlogs);

// Route to create a new blog with image upload
router.post('/', upload, createBlog);

// Route to delete a blog by ID
router.delete('/:id', deleteBlog);

module.exports = router;
