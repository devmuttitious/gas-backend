const mongoose = require('mongoose');

// Define the Gallery Schema
const gallerySchema = new mongoose.Schema({
    image: {
        type: Buffer, // For storing image data as binary (similar to BLOB in MySQL)
        required: true,
        contentType: String, // Optionally store the MIME type of the image
    },
    caption: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    collection: 'Gallery', // Specify the collection name
    timestamps: true,      // Automatically adds createdAt and updatedAt fields
});

// Create and export the Gallery model
const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;
