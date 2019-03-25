const mongoose = require('mongoose');

const incidenceSchema = new mongoose.Schema({
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
    /*dateCreated: {
        type: Date,
        required: true
    },*/
    images: {
        type: [String],
        required: false,
        maxlength: 5
    }
    /*
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:  'User'
    }
    */
});

const Incidence = mongoose.model('Incidence', incidenceSchema);

module.exports = Incidence;
