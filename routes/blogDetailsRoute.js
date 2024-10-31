const express = require('express');
const { getBlogDetails } = require('../controllers/blogDetailsController'); // Adjust path as necessary
const router = express.Router();

router.get('/:id', getBlogDetails); // Ensure this route matches the desired endpoint

module.exports = router;
