const express = require('express');
const multer = require('multer')
const Incidence = require('../models/incidence');
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
router.get('/incidences', async (req, res) => {
    var foundIncidences = [];
    var incidenceFilter = {}
    var radius = req.body.radius
    var center = req.body.center
    if(radius && center) {
        var minX = center.x - radius
        var maxX = center.x + radius;
        var minY = center.y - radius
        var maxY = center.y + radius;
        
        incidenceFilter = {
            $and:[
                {x: {$gte: minX}},
                {x: {$lte: maxX}},
                {y: {$gte: minY}},
                {y: {$lte: maxY}}
            ]
        };
    }
    Incidence.find(incidenceFilter, (err, incidence) => {
        //foundIncidences[incidence._id] = incidence
        if(err){
            res.status(400).send(err);
            return;
        }
        foundIncidences =incidence;
        res.send({incidences: foundIncidences});
    });
});
//Obtener los incidences de test
router.get('/testIncidences', async (req, res) => res.send({incidences: testIncidences}));
//Añadir incidence
router.post('/incidence', upload.array('images[]'), async (req, res) => {
    var newIncidence = new Incidence(req.body);
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
//EN PROGRESO SOLUCIONADA PENDIENTE
router.patch('/incidence/:id', async (req, res) => {
    var updateObject = req.body.incidence;
    var id = req.params.id;
    await Incidence.findOneAndUpdate({_id: ObjectId(id)},{$set: updateObject}, {new: true},
        (err, incidence) => {
            if (err){
                res.status(400).send(err);
                return;
            }
            res.status(200).send(incidence);
    });
    
})

router.patch('/incidence/like/:id', as)

/*
<form action="/profile" method="post" enctype="multipart/form-data">
  <input type="file" name="avatar" />
</form>
*/

router.post('/removeAllIncidences', async (req, res) => {
    await Incidence.remove({});
    res.status(200).send('Removed all incidences');

});
module.exports = router;