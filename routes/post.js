const express = require('express');
const router = express.Router();
const { createPost, getAllPosts, getMyPosts } = require('../controllers/post');
const requireLogin = require('../middleware/requireLogin');

router.route('/createPost').post(requireLogin, createPost);
router.route('/posts').get(getAllPosts);
router.route('/getMyPosts').get(requireLogin, getMyPosts);

module.exports = router;
