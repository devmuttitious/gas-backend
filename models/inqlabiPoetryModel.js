const mongoose = require('mongoose');

// Define the InqlabiPoetry Schema
const inqlabiPoetrySchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    }
}, {
    collection: 'InqlabiPoetry', // Specify the collection name
    timestamps: true,             // Automatically adds createdAt and updatedAt fields
});

// Create and export the InqlabiPoetry model
const InqlabiPoetry = mongoose.model('InqlabiPoetry', inqlabiPoetrySchema);

module.exports = InqlabiPoetry;
