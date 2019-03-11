const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth')
const router = new express.Router();

router.post('/register', async (req, res) => {
    var newUser = new User(req.body.user);
    try {
        await newUser.save();
        const token = await newUser.generateAuthToken();
        res.status(201).send({user: newUser, token});
    } catch(e) {
        res.status(400).send(e);
    }
    
});
//TODO: FIX LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findUser(req.body.user.username, req.body.user.password);
        const token = await user.generateAuthToken();
        res.send({user, token})
    } catch(e) {
        res.status(400).send(e)
    }
});

router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })
        await req.user.save();

        res.send();
    } catch(e) {
        res.status(500).send();
    }
})

module.exports = router;