// backend/models/Blog.js
const { sequelize } = require('../config/db'); // Import the sequelize instance
const { DataTypes } = require('sequelize');

// Define the Blog model
const Blog = sequelize.define('Blog', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
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
    image: {
        type: DataTypes.BLOB('long'), // Long BLOB for storing binary data
        allowNull: true,
    },
}, {
    tableName: 'blogs', // Specify the table name
    timestamps: true,   // Automatically manage createdAt and updatedAt
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

module.exports = BlogDetailsModel;
