const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb+srv://admin-jeferson:Test2020@cluster0.xerkq.mongodb.net/f1DB', {useNewUrlParser: true, useUnifiedTopology: true});

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

router.get("/", (req, res, next) => {
    res.send("Server is worKING properly AYE!!!");
});

router.get("/drivers", (req, res, next) => {
    DriverPoint.find({}, (err, drivers) =>{
        if (!err){
            res.send(drivers);
        } else{
            console.log(err);
            res.send([]);
        }
    });
});

router.get("/constructors", (req, res, next) => {
    ConstructorPoint.find({}, (err, constructors) =>{
        if (!err){
            res.send(constructors);
        } else{
            console.log(err);
            res.send([]);
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