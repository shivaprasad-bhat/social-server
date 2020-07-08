const express = require('express');
const { signUp, signIn } = require('../controllers/auth');
const router = express.Router();
const requireLogin = require('../middleware/requireLogin');

router.route('/signup').post(signUp);
router.route('/signin').post(signIn);
router.route('/').get(requireLogin, (req, res) => {
    res.send('Hello');
});

module.exports = router;
