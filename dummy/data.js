const mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var users = [
    {
        "_id" : ObjectId("5cd936e20f9e4c19047c1b90"),
        "smsCode" : "327351",
        "isAdmin" : false,
        "token" : null,
        "postPoints" : 3,
        "username" : "asdasd",
        "phone" : "620420438",
        "__v" : 0
    }
];
var incidences = [
    {
        "_id" : Date("5cd00b2e7fd15b067c09eb57"),
        "status" : "Pendiente",
        "images" : [],
        "likes" : 1,
        "likedUsers" : [ 
            ObjectId("5cc6c2adef76b104c49df317")
        ],
        "createdAt" : Date("2019-05-06T10:23:34.845Z"),
        "flag" : false,
        "info" : "asdasda",
        "type" : "Destrozo",
        "x" : 41.8,
        "y" : 2.174007,
        "owner" : ObjectId("5cc6c2adef76b104c49df317"),
        "__v" : 1
    },
    {
        "_id" : ObjectId("5cd00b2f7fd15b067c09eb58"),
        "status" : "Pendiente",
        "images" : [],
        "likes" : 0,
        "likedUsers" : [],
        "createdAt" : Date("2019-05-06T10:23:34.845Z"),
        "flag" : false,
        "info" : "asdasda",
        "type" : "Destrozo",
        "x" : 41.8,
        "y" : 2.174007,
        "owner" : ObjectId("5cc6c2adef76b104c49df317"),
        "__v" : 0
    },
    {
        "_id" : ObjectId("5cd00b307fd15b067c09eb59"),
        "status" : "Pendiente",
        "images" : [],
        "likes" : 0,
        "likedUsers" : [],
        "createdAt" : Date("2019-05-06T10:23:34.845Z"),
        "flag" : false,
        "info" : "asdasda",
        "type" : "Destrozo",
        "x" : 41.8,
        "y" : 2.174007,
        "owner" : ObjectId("5cc6c2adef76b104c49df317"),
        "__v" : 0
    }
];

module.exports={users, incidences};
