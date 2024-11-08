const InqlabiPoetry = require('../models/inqlabiPoetryModel'); // Import the InqlabiPoetry model

// Function to fetch poetry entries
const getInqlabiPoetry = async (req, res) => {
    try {
        const poetry = await InqlabiPoetry.find(); // Fetch all poetry entries from MongoDB
        res.json(poetry); // Return the list of poetry entries
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to create a new poetry entry
const createInqlabiPoetry = async (req, res) => {
    const { text, author } = req.body;

    if (!text || !author) {
        return res.status(400).json({ message: "Both text and author fields are required." });
    }

    try {
        const newPoetry = new InqlabiPoetry({ text, author }); // Create a new InqlabiPoetry instance
        await newPoetry.save(); // Save the new poetry entry to MongoDB
        res.status(201).json(newPoetry); // Return the created poetry entry
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Function to delete a poetry entry by ID
const deleteInqlabiPoetry = async (req, res) => {
    const { id } = req.params; // Get the poetry entry ID from the request parameters

    try {
        const deletedPoetry = await InqlabiPoetry.findByIdAndDelete(id); // Find and delete the poetry entry by its MongoDB ID

        if (!deletedPoetry) {
            return res.status(404).json({ message: "Poetry not found." }); // If no poetry entry is found
        }

        res.status(204).send(); // Send a 204 No Content response to indicate successful deletion
    } catch (error) {
        console.error("Error deleting Inqlabi poetry:", error);
        res.status(500).json({ message: "Error deleting poetry: " + error.message }); // Send 500 error if there's an exception
    }
};


module.exports = { getInqlabiPoetry, createInqlabiPoetry, deleteInqlabiPoetry };
