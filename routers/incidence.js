const express = require('express');
const multer = require('multer')
const Incidence = require('../models/incidence');
const router = new express.Router();
const upload = multer({dest: 'uploads/'});
const cloudinary = require('cloudinary');
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
    //var foundIncidences = {}
    var incidenceFilter = {}
    var radius = req.body.radius
    var center = req.body.center
    //typeof radius === 'number' && radius > 0 &&
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
        foundIncidences.push(incidence);
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
            //Aqui borrar arxiu de local
            console.log(res, err);
        });
        return file.filename;
    });
    newIncidence.images = filenames;
    try{
        await newIncidence.save();
        res.send({incidence: newIncidence});
    }catch(e){
        res.status(400).send(e);
    }    
});
/*
<form action="/profile" method="post" enctype="multipart/form-data">
  <input type="file" name="avatar" />
</form>
*/ 
module.exports = router;