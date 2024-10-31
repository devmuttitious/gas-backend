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

module.exports = InqlabiPoetry; // Export the InqlabiPoetry model
