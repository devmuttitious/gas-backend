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
    tableName: 'Blogs', // Specify the existing table name
    timestamps: true,   // Automatically manage createdAt and updatedAt
    freezeTableName: true, // Prevent Sequelize from pluralizing the table name
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

// Sync the model with the database (optional if the table already exists)
Blog.sync({ alter: true }) // Use alter if you want to update the table structure if necessary
    .then(() => console.log('Blog model synced with the database'))
    .catch((error) => console.error('Error syncing Blog model:', error));

module.exports = BlogDetailsModel;
