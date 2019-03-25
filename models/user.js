const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');
var randomize = require('randomatic');


const userSchema  = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        trim:true
    },
    phone: {
        type: String,
        required: true,
        minlength: 4,
        trim: true,
    },
    smsCode: {
        default: null,
        type: String,
        required: false
    },
    isAdmin: {
        default: false,
        type: Boolean,
        required: true
    },
    token: {
        default: null,
        type: String,
        required: false
    }
});

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({phone: user.phone}, 'privatekeyxd');

    user.token = token;
    await user.save();    
    return token
}

userSchema.methods.generateSmsCode = async function() {
    const user = this;
    const smsCode = randomize('0', 6).toString();
    user.smsCode = smsCode;
    await user.save();
    return smsCode;
}

//Hash password vefore saving
userSchema.pre('save', async function (next){
    const user = this;

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password,8);
    }
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;