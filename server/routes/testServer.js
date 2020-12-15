const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const { init } = require("../app");
const { Schema } = mongoose;

const connectionString = 'mongodb+srv://' + process.env.MONGO_ATLAS_CREDENTIALS + '@cluster0.xerkq.mongodb.net/f1DB';
mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});

const seasonSchema = new Schema ({
    year: Number,
    completedRaces: Number,
    championDriverId: String,
    championTemId: String
});

const raceSchema = new Schema ({
    id: String,
    gpname: String,
    shortName: String,
    // Date format: '1987-10-26'
    date: Date,
    track: String,
    roundNumber: Number
});

const raceResultSchema = new Schema ({
    raceId: String,
    driverId: String,
    qualyfication: String,
    raceStart: String,
    raceFinish: String,
    fastestLap: Boolean,
    priceAtRace: Number
});

const driverSchema = new Schema ({
    id: String,
    lastName: String,
    fisrtName: String,
    nationality: String,
    imgPath: String,
    dob: Number,
    worldChampionships: Number,
    driverNumber: Number,
    championshipPoints: Number,
    initialPrice: Number,
    currentPrice: Number,
    sentiment: Number,
    teamId: String
});

const constructorSchema = new Schema ({
    id: String,
    name: String,
    teamPrincipal: String,
    carModel: String,
    teamColor: String,
    engine: String,
    logoPath: String,
    carImgpath: String,
    firstEntry: Number,
    worldChampionships: Number,
    championshiPoints: Number,
    initialPrice: Number,
    currentPrice: Number,
    sentiment: Number,
    driversId: [String]
});

const Season = mongoose.model("Season", seasonSchema);
const Race = mongoose.model("Race", raceSchema);
const RaceResult = mongoose.model("RaceResult", raceResultSchema);
const Driver = mongoose.model("Driver", driverSchema);
const Constructor = mongoose.model("Constructor", constructorSchema);


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
            pointsArray.driversPoints = restructureDataObject(drivers);
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
            pointsArray.constructorsPoints = restructureDataObject(constructors);
            res.redirect("/testServer/");
        } else{
            console.log(err);
            res.redirect("/testServer/");
        }
    });
});

function restructureDataObject(array) {
    const restructuredObjectArray = [];
    array.map(obj => {
        restructuredObjectArray.push({
            name: obj.name,
            points: obj.points,
            price: obj.price,
            pointsPerMi: Number((obj.points/obj.price).toFixed(2))
        });
    });

    return restructuredObjectArray;
};

module.exports = router;