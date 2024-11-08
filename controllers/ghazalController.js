const Ghazal = require('../models/ghazalModel'); // Import the Ghazal model

// Function to fetch all ghazals
const getGhazals = async (req, res) => {
    try {
        const ghazals = await Ghazal.find(); // Fetch all ghazals from MongoDB
        res.json(ghazals); // Return the list of ghazals
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to create a new ghazal
const createGhazal = async (req, res) => {
    const { title, date, author, body } = req.body; // Ensure these fields are present

    if (!title || !date || !author || !body) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const newGhazal = new Ghazal({ title, date, author, body }); // Create a new Ghazal instance
        await newGhazal.save(); // Save the new Ghazal to MongoDB
        res.status(201).json(newGhazal); // Return the created Ghazal
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a Ghazal
const deleteGhazal = async (req, res) => {
    const { id } = req.params; // Get Ghazal ID from the request parameters
    try {
        const ghazal = await Ghazal.findById(id); // Find the Ghazal by its MongoDB ID
        if (!ghazal) {
            return res.status(404).json({ message: 'Ghazal not found' });
        }
        await ghazal.remove(); // Delete the Ghazal from MongoDB
        res.json({ message: 'Ghazal deleted successfully' });
    } catch (error) {
        console.error('Error deleting Ghazal:', error);
        res.status(500).json({ message: 'Error deleting Ghazal' });
    }
};

module.exports = { getGhazals, createGhazal, deleteGhazal };
