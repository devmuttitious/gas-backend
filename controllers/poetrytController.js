// backend/controllers/poetryController.js
const Poetry = require('../models/poetryModel');

// Function to fetch poetry entries
const getPoetry = async (req, res) => {
    try {
        const poetry = await Poetry.findAll(); // Use findAll() for Sequelize
        res.json(poetry);
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

    const newPoetry = {
        text,
        author,
    };

    try {
        const savedPoetry = await Poetry.create(newPoetry); // Use create() for Sequelize
        res.status(201).json(savedPoetry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Function to delete a poetry entry
const deletePoetry = async (req, res) => {
    const { id } = req.params; // Get the ID from the request parameters

    try {
        const result = await Poetry.destroy({ where: { id } }); // Use destroy() for Sequelize

        if (result) {
            res.status(204).send(); // Successfully deleted
        } else {
            res.status(404).json({ message: "Poetry entry not found." });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Export delete function
module.exports = { getPoetry, createPoetry, deletePoetry };

