const mongoose = require('mongoose');

const incidenceSchema = new mongoose.Schema({
    info: {
        type: String,
        required: true,
        minlength: 5
    },
    type: {
        type: String,
        enum: ['Destrozo', 'Mejora', 'Limpiaza', 'Averia'],
        //enum: ['problem', 'cleaning', 'idea', 'pokemon'],
        required: true,
        minlength: 5
    },
    status: {
        type: String,
        required: true,
        enum: ['Pendiente', 'Progreso', 'Solucionada'],
        default: 'Pendiente'

    },
    x: {
        type: Number,
        required: true
    },
    y: {
        type: Number,
        required: true
    },
    images: {
        type: [String],
        required: false,
        maxlength: 5
    },
    likes: {
        type: Number,
        required: true,
        default: 0
    },    
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        //required: true,
        ref:  'User'
    },
    likedUsers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    }

});

incidenceSchema.methods.toJSON = function () {
    const incidence = this;
    const incidenceObject = incidence.toObject();

   incidenceObject.createdAt = incidence._id.getTimestamp();
    delete incidenceObject.tokens;
    return incidenceObject;
};

incidenceSchema.methods.addLike = function(userId) {
    const incidence = this;
    const uId = userId;//mongoose.Types.ObjectId(userId);

    if (!incidence.likedUsers.find((likedId) => {
        return likedId.equals(uId);
    })) {
        incidence.likes = incidence.likes + 1;
        incidence.likedUsers.push(uId);
        incidence.save();    
    }  
    return incidence;
};
const Incidence = mongoose.model('Incidence', incidenceSchema);

module.exports = Incidence;
