const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');


const userSchema  = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        trim:true
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Passowrd cannot contain password')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
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
    const token = jwt.sign({_id: user._id.toString()}, 'privatekeyxd');

    user.tokens = user.tokens.concat({token});
    await user.save();    
    return token
}

userSchema.methods.findUser = async (username, password) => {
    const user = await User.findOne({email});

    if (!user){
        throw new Error('Unable to find user!');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if(!isValid){
        throw new Error('Incorrect password');
    }

    return user
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