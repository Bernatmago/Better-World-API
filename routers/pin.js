const express = require('express');
const Pin = require('../models/pin');
const router = new express.Router();

//Pins falsos para desarrollo
var testPin1 = new Pin({
    info: "test pin1",
    type: "problem",
    x: 41.390205,
    y: 2.154007
});
var testPin2 = new Pin({
    info: "test pin2",
    type: "problem",
    x: 41.38,
    y: 2.154007
});
var testPin3 = new Pin({
    info: "test pin3",
    type: "problem",
    x: 41.4,
    y: 2.154007
});

testPins = [testPin1, testPin2, testPin3];

//Obtener todos los pins
router.get('/pins', async (req, res) => {
    var foundPins = [];
    //var foundPins = {}
    var pinFilter = {}
    var radius = req.body.radius
    var center = req.body.center
    //typeof radius === 'number' && radius > 0 &&
    if(radius && center) {
        var minX = center.x - radius
        var maxX = center.x + radius;
        var minY = center.y - radius
        var maxY = center.y + radius;
        
        pinFilter = {
            $and:[
                {x: {$gte: minX}},
                {x: {$lte: maxX}},
                {y: {$gte: minY}},
                {y: {$lte: maxY}}
            ]
        };
    }
    Pin.find(pinFilter, (err, pin) => {
        //foundPins[pin._id] = pin
        if(err){
            res.status(400).send(err);
            return;
        }
        foundPins.push(pin);
        res.send({pins: foundPins});
    });
});
//Obtener los pins de test
router.get('/testPins', async (req, res) => res.send({pins: testPins}));
//Añadir pin
router.post('/pin', async (req, res) => {
    var newPin = new Pin(req.body.pin);
    try{
        await newPin.save();
        res.send({pin: newPin});
    }catch(e){
        res.status(400).send(e);
    }
    
});
//Añadir pins
router.post('/pins', async (req, res) => {
    //Save an array of pins
    Pin.create(req.body.pins, (err, newPins) => {
        if(err){
            res.status(400).send(err);
            return;
        }         
        res.send({pins: newPins});
    });  
});
module.exports = router;