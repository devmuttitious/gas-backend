const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Gallery = sequelize.define('Gallery', {
    // Add a field for the image (stored as BLOB)
    image: {
        type: DataTypes.BLOB('long'), // Use BLOB type for storing image data
        allowNull: false,
    },
    // Add a field for the caption
    caption: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

// Sync the model with the database
Gallery.sync()
    .then(() => console.log('Gallery model synced with the database'))
    .catch((error) => console.error('Error syncing Gallery model:', error));

module.exports = Gallery;
