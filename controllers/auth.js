const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res, next) => {
    try {
        const { name, email } = req.body;

        let { password } = req.body;
        if (!email || !password | !name) {
            return res.status(422).json({
                error: 'Please all all the fields',
            });
        }

        let user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({
                error: 'Server says, User already present',
            });
        }
        password = await bcryptjs.hash(req.body.password, 12);
        user = await User.create({
            name,
            password,
            email,
        });
        res.status(201).json({
            data: user,
        });
    } catch (error) {
        console.log(error);
    }
};

exports.signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).json({
                succsess: false,
                error: 'Email and Password field missing',
            });
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                succsess: false,
                error: 'Invalid Username or password',
            });
        }
        const match = await bcryptjs.compare(password, user.password);

        if (match) {
            const token = jwt.sign(
                { _id: user._id },
                process.env.JWT_SECRET || ''
            );
            const { _id, name, email } = user;
            res.status(200).json({
                succsess: true,
                message: 'User signed in',
                token: token,
                user: { _id, name, email },
            });
        } else {
            res.status(400).json({
                succsess: false,
                error: 'Invalid Username or password',
            });
        }
    } catch (error) {
        console.log(`${error.message}`);
    }
};
