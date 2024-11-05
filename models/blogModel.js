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

// Model operations
const BlogDetailsModel = {
    // Retrieve a blog by its primary key (id)
    getBlogById: async (id) => {
        try {
            const blog = await Blog.findByPk(id);
            if (!blog) {
                throw new Error('Blog not found');
            }
            return blog;
        } catch (error) {
            console.error(`Error fetching blog with ID ${id}:`, error.message);
            throw error;
        }
    },
};

// Sync the model with the database
Blog.sync()
    .then(() => console.log('Blog model synced with the database'))
    .catch((error) => console.error('Error syncing Blog model:', error));

module.exports = {Blog, BlogDetailsModel};
