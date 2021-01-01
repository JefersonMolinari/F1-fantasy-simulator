const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const { Schema } = mongoose;
const calculatePoints = require("../pointsCalculation");
const q = require('q');

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


function restructureDataObject (array) {
    const restructuredObjectArray = [];
    array.map(obj => {
        restructuredObjectArray.push({
            name: obj.id,
            points: obj.points,
            price: obj.price,
            pointsPerMi: Number((obj.points/obj.price).toFixed(2))
        });
    });

    return restructuredObjectArray;
};
let constructors = [];
let drivers = [];
let raceResults = [];

//CostBennefitTable
router.get("/", (req, res, next) => {
    constructors = [];
    drivers = [];
    raceResults = [];

    const promises = [
        Constructor.find({}).exec(),
        Driver.find({}).exec(),
        RaceResult.find({}).exec()
      ];
      
    q.all(promises).then(result => {
        //Format Constructor
        result[0].map(constructor => {
            constructors.push({
                id: constructor.id,
                name: constructor.name,
                price: constructor.currentPrice,
                drivers: constructor.driversId
            });
        });

        //Format Driver
        result[1].map( driver => {
            drivers.push({
                id: driver.id,
                name: driver.lastName,
                price: driver.currentPrice,
                team: driver.teamId
            });
        });

        //Format RaceResult
        result[2].map( raceResult => {
            raceResults.push({
                raceId: raceResult.raceId,
                driverId: raceResult.driverId,
                qualyfication: raceResult.qualyfication,
                raceStart: raceResult.raceStart,
                raceFinish: raceResult.raceFinish,
                fastestLap: raceResult.fastestLap
            });
        });



        //Load Race Results to Driver
        drivers.map(driver => {
            driver.raceResults = [];
            let drr = raceResults.filter(result => {return result.driverId === driver.id});
            drr.forEach(result => {
                driver.raceResults.push({...result});
            });
        });
    


        //Calculate points
        constructors.map(cr => {
            cr.qualyStreak = 0;
            cr.raceStreak = 0;
            const drs = drivers.filter(dr => dr.team === cr.id);

            crQ = 0;
            crR = 0;
            dr1Q = 0;
            dr1R = 0;
            dr2Q = 0;
            dr2R = 0;

            drs[0].points = 0;
            drs[1].points = 0;
            cr.points = 0;

            for (let i = 0; i < drs[0].raceResults.length; i++) {
                if(Number(drs[0].raceResults[i].qualyfication) <= 10 && Number(drs[1].raceResults[i].qualyfication) <= 10){
                    if (crQ >= 3) {
                        crQ = 1;
                    } else{
                        crQ++;
                    }
                } else{
                    crQ = 0;
                }
                if(Number(drs[0].raceResults[i].raceFinish) <= 10 && Number(drs[1].raceResults[i].raceFinish) <= 10){
                    if (crR >= 3) {
                        crR = 1;
                    } else{
                        crR++;
                    }
                } else{
                    crR = 0;
                }

                if(Number(drs[0].raceResults[i].qualyfication) <= 10){
                    if (dr1Q >= 5) {
                        dr1Q = 1;
                    } else {
                        dr1Q++;
                    }
                } else{
                    dr1Q = 0;
                }
                if(Number(drs[0].raceResults[i].raceFinish) <= 10){
                    if (dr1R >= 5) {
                        dr1R = 1;
                    } else {
                        dr1R++;
                    }
                } else{
                    dr1R = 0
                }

                if(Number(drs[1].raceResults[i].qualyfication) <= 10){
                    if (dr2Q >= 5) {
                        dr2Q = 1;
                    } else {
                        dr2Q++;
                    }
                } else{
                    dr2Q = 0;
                }
                if(Number(drs[1].raceResults[i].raceFinish) <= 10){
                    if (dr2R >= 5) {
                        dr2R = 1;
                    } else {
                        dr2R++;
                    }
                } else{
                    dr2R = 0
                }

                cr.qualyStreak = crQ;
                cr.raceStreak = crR;
                drs[0].raceResults[i].qualyStreak = dr1Q;
                drs[0].raceResults[i].raceStreak = dr1R;

                drs[1].raceResults[i].qualyStreak = dr2Q;
                drs[1].raceResults[i].raceStreak = dr2R;

                const rwp = calculatePoints(cr, drs[0].raceResults[i], drs[1].raceResults[i]);

                drs[0].points += rwp.driver1;
                drs[1].points += rwp.driver2;
                cr.points += rwp.constructor;
            }
        } );

        const driversPoints = restructureDataObject(drivers);
        const constructorsPoints = restructureDataObject(constructors);

        res.send({constructorsPoints, driversPoints});

    }, function(err){
        console.log(err)
    })
});

module.exports = router;