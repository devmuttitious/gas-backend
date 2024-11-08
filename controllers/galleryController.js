const Gallery = require('../models/galleryModel'); // Import the Gallery model
const multer = require('multer');

// Set up multer for file uploads
const storage = multer.memoryStorage(); // Store the file in memory for BLOB
const upload = multer({ storage: storage }).single('image'); // Expects 'image' as the field name for the uploaded file

// Function to fetch all gallery items
const getGalleryItems = async (req, res) => {
    try {
        const galleryItems = await Gallery.find(); // Fetch all gallery items from MongoDB
        const galleryWithBase64Images = galleryItems.map(item => ({
            id: item._id, // MongoDB uses _id as the primary key
            image: item.image ? item.image.toString('base64') : null, // Convert image buffer to Base64 string
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

    // Convert the image buffer to Binary data
    const image = req.file.buffer; // Get the image data from memory storage

    if (!caption) {
        return res.status(400).json({ message: "Caption is required." });
    }

    try {
        const newGalleryItem = new Gallery({ image, caption }); // Create a new gallery item instance
        await newGalleryItem.save(); // Save the new gallery item to MongoDB
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

const deleteGalleryItem = async (req, res) => {
    const { id } = req.params; // Get ID from URL

    try {
        // Make sure you're calling the correct method to delete the image
        const deletedImage = await Gallery.findByIdAndDelete(id); // Or whatever your delete method is
        
        if (!deletedImage) {
            return res.status(404).json({ message: "Image not found" });
        }

        res.status(200).json({ message: "Image deleted successfully" });
    } catch (error) {
        console.error("Error deleting image:", error);
        res.status(500).json({ message: "Error deleting image" });
    }
};


module.exports = { getGalleryItems, createGalleryItem, uploadImage, deleteGalleryItem };
