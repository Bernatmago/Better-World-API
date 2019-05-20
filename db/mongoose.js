const mongoose = require('mongoose');
//const cred = require('../credentials')
const cred = null;
mongoose.Promise = global.Promise;
var mongoUri = 'mongodb://localhost/bw';
if (process.env.TESTING){
    mongoUri = 'mongodb://localhost/bw-test';
}else if(process.env.IS_HEROKU){
    mongoUri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@betterworld-xjdey.mongodb.net/test`;
}
module.exports = function(callback){
    mongoose.connect(mongoUri,
        {
            connectTimeoutMS: 10000,
            useNewUrlParser: true
        })
        .then(() => {
            console.log('connection succesful')
            callback();
        })
        .catch((err) => console.error(err));
}