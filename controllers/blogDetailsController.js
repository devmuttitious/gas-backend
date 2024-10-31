const BlogDetailsModel = require('../models/blogDetailsModel');

const getBlogDetails = async (req, res) => {
    const blogId = req.params.id;
    console.log(`Fetching details for blog ID: ${blogId}`);

    try {
        const blog = await BlogDetailsModel.getBlogById(blogId);

        // Convert BLOB image to base64 if it exists
        const blogData = {
            ...blog.toJSON(),
            image: blog.image ? blog.image.toString('base64') : null // Convert BLOB to base64
        };

        res.status(200).json(blogData);
    } catch (error) {
        console.error('Error fetching blog details:', error);
        if (error.message === 'Blog not found') {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getBlogDetails,
};
