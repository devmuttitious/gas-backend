// backend/controllers/poetryController.js
const Poetry = require('../models/poetryModel'); // Import the Poetry model

// Function to fetch poetry entries
const getPoetry = async (req, res) => {
    try {
        const poetry = await Poetry.find(); // Use find() to fetch all documents from MongoDB
        res.json(poetry); // Return the fetched poetry entries
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to create a new poetry entry
const createPoetry = async (req, res) => {
    const { text, author } = req.body; // Destructure fields from req.body

    // Check if text and author are provided
    if (!text || !author) {
        return res.status(400).json({ message: "Both text and author fields are required." });
    }

    const newPoetry = new Poetry({ // Create a new Poetry instance
        text,
        author,
    });

    try {
        const savedPoetry = await newPoetry.save(); // Save the poetry entry to MongoDB
        res.status(201).json(savedPoetry); // Return the saved poetry entry
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Function to delete a poetry entry
const deletePoetry = async (req, res) => {
    const { id } = req.params; // Get the ID from the request parameters

    try {
        const deletedPoetry = await Poetry.findByIdAndDelete(id); // Find and delete the poetry entry by its MongoDB ID

        if (!deletedPoetry) {
            return res.status(404).json({ message: "Poetry entry not found." }); // If poetry entry not found
        }

        res.status(204).send(); // Successfully deleted, no content to return
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Export the functions
module.exports = { getPoetry, createPoetry, deletePoetry };
