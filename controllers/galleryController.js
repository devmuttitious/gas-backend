const Gallery = require('../models/galleryModel'); // Import the Gallery model
const multer = require('multer');

// Set up multer for file uploads
const storage = multer.memoryStorage(); // Store the file in memory for BLOB
const upload = multer({ storage: storage }).single('image'); // Expects 'image' as the field name for the uploaded file

// Function to fetch all gallery items
const getGalleryItems = async (req, res) => {
    try {
        const galleryItems = await Gallery.findAll(); // Fetch all gallery items
        const galleryWithBase64Images = galleryItems.map(item => ({
            id: item.id,
            image: item.image ? item.image.toString('base64') : null, // Convert BLOB to Base64 string
            caption: item.caption
        }));
        res.json(galleryWithBase64Images);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to create a new gallery item
const createGalleryItem = async (req, res) => {
    const { caption } = req.body; // Expecting caption from request body

    // Ensure the image has been uploaded
    if (!req.file) {
        return res.status(400).json({ message: "Image file is required." });
    }

    // Convert the image buffer to BLOB format
    const image = req.file.buffer; // Get the image data from memory storage

    if (!caption) {
        return res.status(400).json({ message: "Caption is required." });
    }

    try {
        const newGalleryItem = await Gallery.create({ image, caption }); // Create a new gallery item
        res.status(201).json(newGalleryItem);
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

// Function to delete a gallery item by ID
const deleteGalleryItem = async (req, res) => {
    const { id } = req.params; // Get gallery item ID from request parameters

    try {
        const galleryItem = await Gallery.findByPk(id); // Find the gallery item by primary key (ID)
        if (!galleryItem) {
            return res.status(404).json({ message: "Gallery item not found." });
        }

        await galleryItem.destroy(); // Delete the gallery item from the database
        res.status(200).json({ message: "Gallery item deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getGalleryItems, createGalleryItem, uploadImage, deleteGalleryItem };
