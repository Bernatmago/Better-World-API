const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/bw')
    .then(() => console.log('connection succesful'))
    .catch((err) => console.error(err));
