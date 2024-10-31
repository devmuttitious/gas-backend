// backend/routes/poetryRoutes.js
const express = require('express');
const router = express.Router();
const { getPoetry, createPoetry, deletePoetry } = require('../controllers/poetrytController');

router.get('/', getPoetry);         // GET request to fetch poetry entries
router.post('/', createPoetry);     // POST request to create a new poetry entry
// Route to delete a poetry entry
router.delete('/:id', deletePoetry);

module.exports = router;
