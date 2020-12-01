const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const { Schema } = mongoose;

const connectionString = 'mongodb+srv://' + process.env.MONGO_ATLAS_CREDENTIALS + '@cluster0.xerkq.mongodb.net/f1DB';
mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});

// const raceDetailSchema = new Schema ({
//     name: String,
//     // Date format: '1987-10-26'
//     date: Date,
//     track: String,
// });
// const raceSchema = new Schema ({
//     raceDetail: raceDetailSchema,
//     qualyfication: String,
//     raceStart: String,
//     raceFinish: String
// });

// const driverSchema = new Schema ({
//     lastName: String,
//     fisrtName: String,
//     shortName: String,
//     imgPath: String,
//     dob: Date,
//     worldChampionships: Number,
//     driverNumber: Number,
//     InitialValue: Number,
//     sentiment: Number,
//     qualyStreak: Number,
//     raceStreak: Number,
//     team: constructorSchema,
//     races: [raceSchema]
// });

// const constructorSchema = new Schema ({
//     name: String,
//     teamPrincipal: String,
//     carModel: String,
//     engine: String,
//     logoPath: String,
//     carImgpath: String,
//     firstEntry: Number,
//     worldChampionships: Number,
//     InitialValue: Number,
//     sentiment: Number,
//     qualyStreak: Number,
//     raceStreak: Number,
//     drivers: [driverSchema]
// });

const pointsSchema = new Schema ({
    points: Number,
    price: Number,
    name: String
});

const DriverPoint = mongoose.model("DriverPoint", pointsSchema);
const ConstructorPoint = mongoose.model("ConstructorPoint", pointsSchema);

const pointsArray = {
    driversPoints: [],
    constructorsPoints: []
};

router.get("/", (req, res, next) => {
    console.log("GOT HERE");
    if (!pointsArray.driversPoints.length || !pointsArray.constructorsPoints.length ) {
        console.log("IS EMPTY??");
        console.log(pointsArray);
        if (!pointsArray.driversPoints.length) {
            console.log("driver array empty");
            res.redirect("/testServer/drivers");
        }
        console.log("CHECK CR");
        if (!pointsArray.constructorsPoints.length) {
            console.log("CR array empty");
            res.redirect("/testServer/constructors");
        } else {
            console.log("Why came here");
        }
    } else {
        console.log("/: array NOT empty");
        res.send(pointsArray)
    }
});

router.get("/drivers", (req, res, next) => {
    DriverPoint.find({}, (err, drivers) =>{
        if (!err){
            pointsArray.driversPoints.push(...drivers);
            console.log("loads DR array");
            res.redirect("/testServer/");
        } else{
            console.log(err);
            res.redirect("/testServer/");
        }
    });
});

router.get("/constructors", (req, res, next) => {
    ConstructorPoint.find({}, (err, constructors) =>{
        if (!err){
            pointsArray.constructorsPoints.push(...constructors);
            console.log("loads CR array");
            res.redirect("/testServer/");
        } else{
            console.log(err);
            res.redirect("/testServer/");
        }
    });
});

router.put('/', (req, res) => {
// PUT controller function 
});

router.post('/', (req, res) => {
// POST controller function 
});

router.patch('/', (req, res) => {
// PATCH controller function 
});

router.delete('/', (req, res) => {
// DELETE controller function 
});

module.exports = router;