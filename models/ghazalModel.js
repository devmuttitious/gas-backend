// backend/models/Ghazal.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Ghazal = sequelize.define('Ghazal', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
});

// Sync the model with the database
Ghazal.sync()
    .then(() => console.log('Ghazal model synced with the database'))
    .catch((error) => console.error('Error syncing Ghazal model:', error));

module.exports = Ghazal;
