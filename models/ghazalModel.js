const mongoose = require('mongoose');

// Define the Ghazal Schema
const ghazalSchema = new mongoose.Schema({
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
    body: {
        type: String,
        required: true,
    }
}, {
    collection: 'Ghazals', // Specify the collection name
    timestamps: true,      // Automatically adds createdAt and updatedAt fields
});

// Create and export the Ghazal model
const Ghazal = mongoose.model('Ghazal', ghazalSchema);

module.exports = Ghazal;
