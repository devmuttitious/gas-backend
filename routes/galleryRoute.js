const express = require('express');
const { getGalleryItems, createGalleryItem, deleteGalleryItem } = require('../controllers/galleryController'); // Import gallery controller
const router = express.Router();
const multer = require('multer');

// Set up multer for image uploads
const storage = multer.memoryStorage(); // Store images in memory
const upload = multer({ storage }).single('image'); // Expect 'image' field for file upload

// Define routes for gallery
router.get('/', getGalleryItems); // GET all gallery items
router.post('/', upload, createGalleryItem); // POST a new gallery item with image upload
router.delete('/:id', deleteGalleryItem); // DELETE a gallery item by ID

module.exports = router;
