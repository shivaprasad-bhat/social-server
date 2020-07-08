const User = require('../models/User');
const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({
            success: false,
            error: 'You must be logged in',
        });
    }
    const token = authorization.replace('Bearer ', '');
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({
                success: false,
                error: 'You must be logged in',
            });
        }
        const { _id } = payload;
        User.findById({ _id }).then((user) => {
            req.user = user;
            next();
        });
    });
};

module.exports = verifyToken;
