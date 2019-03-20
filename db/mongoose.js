const mongoose = require('mongoose');
//const cred = require('../credentials')
const cred = null;
mongoose.Promise = global.Promise;

mongoose.connect(`mongodb+srv://${cred.mongodb.user || process.env.MONGO_USER}:${cred.mongodb.password || process.env.MONGO_PASSWORD}@betterworld-xjdey.mongodb.net/test`,
    {
        connectTimeoutMS: 1000
    })
    .then(() => console.log('connection succesful'))
    .catch((err) => console.error(err));
//mongodb+srv://97bernatmart:<password>@betterworld-xjdey.mongodb.net/bw?retryWrites=true
//mongodb://localhost/bw