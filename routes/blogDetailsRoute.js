// blogDetailsRoute.js
const express = require('express');
const { getBlogDetails } = require('../controllers/blogDetailsController'); // Import the getBlogDetails controller
const router = express.Router();

// Define route for fetching a specific blog's details
router.get('/:id', getBlogDetails); // Get blog details by ID

module.exports = router;
