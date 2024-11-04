// backend/models/InqlabiPoetry.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const InqlabiPoetry = sequelize.define('InqlabiPoetry', { 
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

// Sync the model with the database
InqlabiPoetry.sync()
    .then(() => console.log('InqlabiPoetry model synced with the database'))
    .catch((error) => console.error('Error syncing InqlabiPoetry model:', error));

module.exports = InqlabiPoetry; // Export the InqlabiPoetry model
