const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const smsClient = require('twilio')(accountSid, authToken);
const router = new express.Router();

//Create the user in the database and send an sms code back
router.post('/user/register', async (req, res) => {
    User.findOne({phone: req.body.user.phone}, async (err, user) => {
        if(!user){
            user = new User(req.body.user);
        }
        try {
            //This stores the user too
            const smsCode = await user.generateSmsCode();
            const sendSms = false;
            if(sendSms){               
                smsClient.messages
                    .create({
                        body: `BetterWorld: Your verification code is ${smsCode}`,
                        from: process.env.FROM_PHONE,
                        to: req.body.user.phone
                    })
                    .then(message => console.log(message.sid));
            }
            res.status(201).send({smsCode});
        } catch(e) {
            res.status(400).send(e);
        }  
    });
});

//Verify the sms code and send the unique token that must be saved if it is correct
router.post('/user/verify', async (req, res) => {

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
        user.smsCode = null;
        await user.save();
        //jwt.sign({_id: user._id.toString()}, 'privatekeyxd');
        res.send({token})
    });
});

router.post('/user/logTest', auth, async (req, res) => {
    res.status(200).send("All ok");
});

//TODO: acabar logout
router.post('/user/logout', auth, async (req, res) => {
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

router.delete('/user/removeAll', auth, async (req, res) => {

    if(req.user.isAdmin) {
        await User.deleteMany({});
        res.status(200).send("Removed all users");
    } else {
        res.status(400).send("You have no permission");
    }
    
});

router.delete('/user/:id', auth, async (req, res) => {
    User.findById(mongoose.Types.ObjectId(req.params.id), (err, user) => {
        if(err){
            res.status(400).send(err);
            return;
        }
        res.status(200).send(`User with id ${req.params.id} and phone ${user.phone} removed`);
    });

});

router.patch('/user/:id', auth, async (req, res) => {
    var updateObject = req.body.user;
    if(req.user.isAdmin){
        User.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.params.id)}, {$set: updateObject}, {new: true}, (err, user) => {
            if (err){
                res.status(400).send(err);
                return;
            }
            if(!user){
                res.status(400).send('No user found');
            }
            res.status(200).send(user);        
        });
    }else{
        res.status(400).send('You are not an admin!');
    }
});

module.exports = router;

/*
cloudinary.uploader.upload("sample.jpg", {"crop":"limit","tags":"samples","width":3000,"height":2000}, function(result) { console.log(result) });
*/ 