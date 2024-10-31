const { sequelize } = require('../config/db'); // Import the sequelize instance
const { DataTypes } = require('sequelize');

// Define the Blog model (if not already defined)
const Blog = sequelize.define('Blog', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: DataTypes.STRING,
    date: DataTypes.DATE,
    author: DataTypes.STRING,
    content: DataTypes.TEXT,
    image: DataTypes.BLOB('long'), // Change to BLOB type for storing binary data
}, {
    tableName: 'blogs', // Specify the table name
    timestamps: true,   // Automatically manage createdAt and updatedAt
});

const BlogDetailsModel = {
    getBlogById: (id) => {
        return Blog.findByPk(id)
            .then(blog => {
                if (!blog) {
                    throw new Error('Blog not found');
                }
                return blog;
            });
    },
};

module.exports = BlogDetailsModel;
