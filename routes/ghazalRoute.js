// backend/routes/ghazalRoute.js
const express = require('express');
const { getGhazals, createGhazal, deleteGhazal } = require('../controllers/ghazalController');
const router = express.Router();

router.get('/', getGhazals); // GET all ghazals
router.post('/', createGhazal); // POST a new ghazal
router.delete('/:id', deleteGhazal); // Delete ghazal

module.exports = router;
