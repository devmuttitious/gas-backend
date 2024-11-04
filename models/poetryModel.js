// backend/models/Poetry.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Poetry = sequelize.define('Poetry', {
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
Poetry.sync()
    .then(() => console.log('Poetry model synced with the database'))
    .catch((error) => console.error('Error syncing Poetry model:', error));

module.exports = Poetry;
