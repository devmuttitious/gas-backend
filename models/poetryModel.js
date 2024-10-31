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

module.exports = Poetry;
