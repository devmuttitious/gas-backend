const Ghazal = require('../models/ghazalModel');

// Function to fetch all ghazals
const getGhazals = async (req, res) => {
    try {
        const ghazals = await Ghazal.findAll(); // Assuming you are using Sequelize
        res.json(ghazals);
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
        const newGhazal = await Ghazal.create({ title, date, author, body });
        res.status(201).json(newGhazal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a Ghazal
const deleteGhazal = async (req, res) => {
    const { id } = req.params;
    try {
        const ghazal = await Ghazal.findByPk(id);
        if (!ghazal) {
            return res.status(404).json({ message: 'Ghazal not found' });
        }
        await ghazal.destroy();
        res.json({ message: 'Ghazal deleted successfully' });
    } catch (error) {
        console.error('Error deleting Ghazal:', error);
        res.status(500).json({ message: 'Error deleting Ghazal' });
    }
};

module.exports = { getGhazals, createGhazal, deleteGhazal };
