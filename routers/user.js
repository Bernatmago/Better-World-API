const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();

//Create the user in the database and send an sms code back
router.post('/register', async (req, res) => {
    var newUser = new User(req.body.user);
    try {
        //This stores the user too
        const smsCode = await newUser.generateSmsCode();

        res.status(201).send({smsCode});
    } catch(e) {
        res.status(400).send(e);
    }
    
});

//Verify the sms code and send the unique token that must be saved if it is correct
router.post('/verify', async (req, res) => {

    User.findOne({phone: req.body.user.phone}, async (err, user) => {
        if(err){
            res.status(400).send(err);
            return;
        }
        if(!user){
            res.status(400).send('user not found', req.body.phone);
            return;
        }
        if(user.smsCode !== req.body.user.smsCode){
            res.status(400).send('wrong code');
            return;
        }
        const token = await user.generateAuthToken();
        //jwt.sign({_id: user._id.toString()}, 'privatekeyxd');
        res.send({token})
    });
});

router.post('/logTest', auth, async (req, res) => {
    res.status(200).send("All ok");
});

router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })
        await req.user.save();

        res.send("owo");
    } catch(e) {
        res.status(500).send();
    }
});

module.exports = router;