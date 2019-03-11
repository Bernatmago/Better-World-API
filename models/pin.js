const mongoose = require('mongoose');

const pinSchema = new mongoose.Schema({
    info: {
        type: String,
        required: true,
        minlength: 5
    },
    type: {
        type: String,
        enum: ['problem', 'cleaning', 'idea', 'pokemon'],
        required: true,
        minlength: 5
    },
    x: {
        type: Number,
        required: true
    },
    y: {
        type: Number,
        required: true
    },
    /*
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:  'User'
    }
    */
});

const Pin = mongoose.model('Pin', pinSchema);

module.exports = Pin;
