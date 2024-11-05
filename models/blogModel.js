const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Blog = sequelize.define('Blog', {
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
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    // Change from imageUrl to image for storing file
    image: {
        type: DataTypes.BLOB('long'), // Use BLOB type for image data
        allowNull: false,
    }
});

// Sync the model with the database
Blog.sync()
    .then(() => console.log('Blog model synced with the database'))
    .catch((error) => console.error('Error syncing Blog model:', error));

module.exports = Blog;
