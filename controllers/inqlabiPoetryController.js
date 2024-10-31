// backend/controllers/inqlabiPoetryController.js
const InqlabiPoetry = require('../models/inqlabiPoetryModel');

// Function to fetch poetry entries
const getInqlabiPoetry = async (req, res) => {
    try {
        const poetry = await InqlabiPoetry.findAll();
        res.json(poetry);
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
        const newPoetry = await InqlabiPoetry.create({ text, author });
        res.status(201).json(newPoetry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Function to delete a poetry entry by ID
const deleteInqlabiPoetry = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await InqlabiPoetry.destroy({ where: { id } });

        if (deleted) {
            return res.status(204).send(); // No Content response
        }

        res.status(404).json({ message: "Poetry not found." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { getInqlabiPoetry, createInqlabiPoetry, deleteInqlabiPoetry };
