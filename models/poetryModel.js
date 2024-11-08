const mongoose = require('mongoose');

// Define the Poetry Schema
const poetrySchema = new mongoose.Schema({
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
    collection: 'Poetry',  // Specify the collection name
    timestamps: true,       // Automatically adds createdAt and updatedAt fields
});

// Create and export the Poetry model
const Poetry = mongoose.model('Poetry', poetrySchema);

module.exports = Poetry;
