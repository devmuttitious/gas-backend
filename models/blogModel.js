const mongoose = require('mongoose');

// Define the Blog Schema
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: Buffer, // For storing image data as binary (similar to BLOB)
        required: true,
        contentType: String, // Optionally store the MIME type of the image
    }
}, {
    collection: 'Blogs', // Specify the collection name
    timestamps: true,    // Automatically adds createdAt and updatedAt fields
});

// Create and export the Blog model
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
