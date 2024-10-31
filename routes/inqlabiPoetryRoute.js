// backend/routes/inqlabiPoetryRoutes.js
const express = require('express');
const router = express.Router();
const { getInqlabiPoetry, createInqlabiPoetry, deleteInqlabiPoetry } = require('../controllers/inqlabiPoetryController'); // Updated controller import

router.get('/', getInqlabiPoetry);         // GET request to fetch inqlabi poetry entries
router.post('/', createInqlabiPoetry);     // POST request to create a new inqlabi poetry entry
// DELETE request to remove an inqlabi poetry entry
router.delete('/:id', deleteInqlabiPoetry);

module.exports = router; // Export the router
