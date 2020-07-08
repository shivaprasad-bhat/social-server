const Post = require('../models/Post');
exports.createPost = async (req, res) => {
    try {
        const { title, body } = req.body;
        if (!title || !body) {
            return res.status(422).json({
                success: false,
                message: 'Please add all required fields',
            });
        }

        req.user.password = undefined;
        const post = await Post.create({
            title,
            body,
            postedBy: req.user,
        });
        if (post) {
            res.status(400).json({
                success: true,
                data: post,
            });
        }
    } catch (error) {
        console.log(`${error.message}`);
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('postedBy', '_id name');
        if (posts) {
            res.status(200).json({
                success: true,
                data: posts,
            });
        }
    } catch (error) {
        console.log(`${error.message}`);
    }
};

exports.getMyPosts = async (req, res) => {
    try {
        const posts = await Post.find({ postedBy: req.user._id }).populate(
            'postedBy',
            '_id name'
        );
        if (!posts) {
            return res
                .status(201)
                .json({ success: false, message: 'No posts found' });
        }
        res.status(200).json({
            success: true,
            data: posts,
        });
    } catch (error) {
        console.log(`${error.message}`.red.inverse);
    }
};
