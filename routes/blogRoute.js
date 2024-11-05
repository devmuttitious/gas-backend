const express = require('express');
const { getBlogs, createBlog, deleteBlog } = require('../controllers/blogController');
const router = express.Router();
const multer = require('multer');

// Set up multer for image uploads
const storage = multer.memoryStorage(); // Store images in memory
const upload = multer({ storage }).single('image'); // Expect 'image' field for file upload

router.get('/', getBlogs); // GET all blogs
router.post('/', upload, createBlog); // POST a new blog with image upload
router.delete('/:id', deleteBlog); // DELETE a blog by ID

module.exports = router;
