const express = require('express');
const multer = require('multer');
const moment = require('moment');
const auth = require('../middleware/auth');
const Incidence = require('../models/incidence');
const mongoose = require('mongoose');
const router = new express.Router();
const upload = multer({dest: 'uploads/'});
const cloudinary = require('cloudinary');
const fs = require('fs');
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
})

//Incidences falsos para desarrollo
var testIncidence1 = new Incidence({
    info: "test incidence1",
    type: "problem",
    x: 41.390205,
    y: 2.154007
});
var testIncidence2 = new Incidence({
    info: "test incidence2",
    type: "problem",
    x: 41.38,
    y: 2.154007
});
var testIncidence3 = new Incidence({
    info: "test incidence3",
    type: "problem",
    x: 41.4,
    y: 2.154007
});

testIncidences = [testIncidence1, testIncidence2, testIncidence3];

//Obtener todos los incidences
router.get('/incidences', auth, async (req, res) => {
    var foundIncidences = [];
    var incidenceFilter = {}
    var radius = req.query.radius
    var x = req.query.x
    var y = req.query.y
    if(radius && x && y) {
        var minX = x - radius
        var maxX = x + radius;
        var minY = y - radius
        var maxY = y + radius;
        
        incidenceFilter = {
            $and:[
                {x: {$gte: minX}},
                {x: {$lte: maxX}},
                {y: {$gte: minY}},
                {y: {$lte: maxY}}
            ]
        };
    }
    Incidence.find(incidenceFilter, (err, incidences) => {
        //foundIncidences[incidence._id] = incidence
        if(err){
            res.status(400).send(err);
            return;
        }
        res.send({incidences});
    });
});
//Obtener los incidences de test
router.get('/incidence/test', async (req, res) => res.send({incidences: testIncidences}));
//Añadir incidence
router.post('/incidence', auth, upload.array('images[]'), async (req, res) => {
    var newIncidence = new Incidence(req.body);
    if (req.user.posPoints < 1){
        res.status(400).send("Cant post more incidences");
        return;
    }
    newIncidence.owner = req.user._id;
    const filenames = req.files.map((file) => {
        cloudinary.v2.uploader.upload(file.path, (err, res) => {
            console.log(res, err);
            fs.unlinkSync(file.path)
        });
        return file.filename;
    });
    newIncidence.images = filenames;
    //await newIncidence.dateCreated(Date.now());
    try{
        await newIncidence.save();
        res.send({incidence: newIncidence});
    }catch(e){
        res.status(400).send(e);
    }    
});

//Obtener incidencia por id
router.get('/incidence/:id', auth, async (req, res) => {
    Incidence.findById(mongoose.Types.ObjectId(req.params.id), (err, incidence) => {
        if(err){
            res.status(400).send(err);
            return;
        }
        res.status(200).send({incidence});
    });
});

//Contar incidencias (ALL)
//TODO: No va el filtro
router.get('/incidences/count', auth, (req,res) => {
    var filter = {};
    var filterDate = req.body.countDate;
    /*if(filterDate) {
        filter = {
            createdAt: {
                $gt: moment(filterDate).startOf('day').format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
                $lt: moment(filterDate).startOf('day').add('1', 'day').format("YYYY-MM-DDTHH:mm:ss.SSSZ")
            }
        }
    }*/
    //Afegir filte
    //incidence._id.getTimestamp();
    Incidence.estimatedDocumentCount(filter, (err, nIncidences) => {
        if(err){
            res.status(400).send(err);
            return;
        }
        res.status(200).send({
            count : nIncidences,
            filter
        });
    });
});

//Edit incidence by id
router.patch('/incidence/:id', auth, async (req, res) => {
    var updateObject = req.body.incidence;
    const id = req.params.id;
    Incidence.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)},{$set: updateObject}, {new: true}, (err, incidence) => {
            if (err){
                res.status(400).send(err);
                return;
            }
            if(!incidence){
                res.status(400).send('No incidence found');
            }
            res.status(200).send(incidence);        
    });
});

//Like incidence
router.post('/incidence/:id/like', auth, async (req, res) => {
    const id = req.params.id;
    Incidence.findById(mongoose.Types.ObjectId(id), (err, incidence) =>{
        if(err) {
            res.status(400).send(err);
            return;
        }
        if(!incidence) {
            res.status(400).send('Cant like incidence, doesnt exist!');
            return;
        }
        const updatedIncidence = incidence.addLike(req.user._id);
        res.status(200).send(updatedIncidence);  
    });
});

//Flag incidence
//TODO: FIX
router.post('incidence/:id/flag', auth, async (req, res) => {
    if(!req.user.isAdmin) {
        res.status(400).send('You are not an admin, Crack!')
        return;
    }
    Incidence.findById(mongoose.Types.ObjectId(id), (err, incidence) =>{
        if(err) {
            res.status(400).send(err);
            return;
        }
        if(!incidence) {
            res.status(400).send('Cant flag incidence, doesnt exist!');
            return;
        }
        const updatedIncidence = incidence.flag(true);
        res.status(200).send(updatedIncidence);  
    });
});

/*
<form action="/profile" method="post" enctype="multipart/form-data">
  <input type="file" name="avatar" />
</form>
*/

router.delete('/incidence/removeAll', auth, async (req, res) => {
    await Incidence.deleteMany({});
    res.status(200).send('Removed all incidences');

});
module.exports = router;