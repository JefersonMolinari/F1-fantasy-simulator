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
    console.log(pointsArray);
    if (!pointsArray.driversPoints.length) {
        res.redirect("/testServer/drivers");
    }
    
    if (!pointsArray.constructorsPoints.length) {
        res.redirect("/testServer/constructors");
    }
    
    res.send(pointsArray);
});

router.get("/drivers", (req, res, next) => {
    DriverPoint.find({}, (err, drivers) =>{
        if (!err){
            pointsArray.driversPoints.push(...drivers);
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
            res.redirect("/testServer/");
        } else{
            console.log(err);
            res.redirect("/testServer/");
        }
    });
});

module.exports = router;