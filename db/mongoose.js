const mongoose = require('mongoose');
const cred = require('../credentials')
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb+srv://${cred.mongodb.user}:${cred.mongodb.password}@betterworld-xjdey.mongodb.net/test`,
    {
        connectTimeoutMS: 1000
    })
    .then(() => console.log('connection succesful'))
    .catch((err) => console.error(err));
//mongodb+srv://97bernatmart:<password>@betterworld-xjdey.mongodb.net/bw?retryWrites=true
//mongodb://localhost/bw