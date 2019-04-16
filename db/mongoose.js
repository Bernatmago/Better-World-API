const mongoose = require('mongoose');
//const cred = require('../credentials')
const cred = null;
mongoose.Promise = global.Promise;
var mongoUri = 'mongodb://localhost/bw';
if (process.env.IS_HEROKU){
    mongoUri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@betterworld-xjdey.mongodb.net/test`;
}
mongoose.connect(mongoUri,
    {
        connectTimeoutMS: 10000,
        useNewUrlParser: true
    })
    .then(() => console.log('connection succesful'))
    .catch((err) => console.error(err));
//mongodb+srv://97bernatmart:<password>@betterworld-xjdey.mongodb.net/bw?retryWrites=true
//mongodb://localhost/bw