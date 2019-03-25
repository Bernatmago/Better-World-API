const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {

    const token = req.get('x-auth');
    const decoded = jwt.verify(token, 'privatekeyxd');
    const user = await User.findOne({phone: decoded.phone, token: token});

    if (!user) {
        res.status(401).send(decoded.phone);
        return;
    }

    req.token = token;
    req.user = user;
    next();
}

module.exports = auth;