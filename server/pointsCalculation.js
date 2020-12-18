//POINTS FOR QUALIFYING SESSION
const QUALY_AHEAD_OF_MATE = 2;
const QUALIFYING_POINTS = {
    1: 13,
    2: 12,
    3: 11,
    4: 10,
    5: 9,
    6: 8,
    7: 7,
    8: 6,
    9: 5,
    10: 4,
    11: 2,
    12: 2,
    13: 2,
    14: 2,
    15: 2,
    16: 1,
    17: 1,
    18: 1,
    19: 1,
    20: 1,
    "DNQ": -5,
    "DNS": -5,
    "DSQ": -10,
};

//POINTS FOR RACE SESSION
const RACE_AHEAD_OF_MATE = 3;
const FASTEST_LAP = 5;
const MAX_POS_CHANGE_GAIN = 5;
const MAX_POS_CHANGE_LOSS = -5;
const POSITION_GAINED = 2;
const POSITION_LOST_TOP_10 = 2;
const POSITION_LOST_BOTTOM_10 = 1;
const RACE_POINTS = {
    1: 26,
    2: 19,
    3: 16,
    4: 13,
    5: 11,
    6: 9,
    7: 7,
    8: 5,
    9: 3,
    10: 2,
    11: 1,
    12: 1,
    13: 1,
    14: 1,
    15: 1,
    16: 1,
    17: 1,
    18: 1,
    19: 1,
    20: 1,
    "DNF": -15,
    "DNS": -15,
    "DSQ": -20,
};

//POINTS FOR STREAKS
const STREAK_LENGHT_DRIVER = 5;
const STREAK_LENGHT_CR = 3;
const STREAK_QUALY_TOP_10_DRIVER = 5;
const STREAK_RACE_TOP_10_DRIVER = 10;
const STREAK_QUALY_TOP_10_CR = 5;
const STREAK_RACE_TOP_10_CR = 10;

const DNS = "DNS";
const DNQ = "DNQ";
const DNF = "DNF";
const DSQ = "DSQ";

//Calculate race week points from team and drivers
function calculateRaceWeekPoints(constructor, driver1, driver2) {
    const {
        qualy_streak,
        race_streak
    } = constructor;

    //Caculate raceWeekPoints for Driver 1
    const ptDr1 = calculateRaceWeekPointsDriver(driver1, driver2.qualy, driver2.race_finish);
    const pointsDriver1 = ptDr1.driver;

    //Caculate raceWeekPoints for Driver 2
    const ptDr2 = calculateRaceWeekPointsDriver(driver2, driver1.qualy, driver1.race_finish);
    const pointsDriver2 = ptDr2.driver;

    //Caculate raceWeekPoints for Team
    let pointsCr = ptDr1.constructor + ptDr2.constructor;

    //Add Streak points, from qualifying, to Team
    if (qualy_streak == STREAK_LENGHT_CR) {
        pointsCr += STREAK_QUALY_TOP_10_CR;
    }
    //Add Streak points, from race, to Team
    if (race_streak == STREAK_LENGHT_CR) {
        pointsCr += STREAK_RACE_TOP_10_CR;
    }

    return {
        driver_1:  pointsDriver1,
        driver_2:  pointsDriver2,
        constructor:  pointsCr
    };

}

//calculate RaceWeek points for Driver and corresponding points for Team - receive driver info and teammare result for Qualifying and Race
function calculateRaceWeekPointsDriver(driver, teammateQualy, teammateRaceFinish) {
    const ptQualy = calculateQualyPoints(driver, teammateQualy);
    const ptRace = calculateRacePoints(driver, teammateRaceFinish);

    const raceWeekPointsDriver = ptQualy.driver + ptRace.driver;
    const pointsConstructor = ptQualy.constructor + ptRace.constructor;

    return {driver: raceWeekPointsDriver, constructor: pointsConstructor};
}

//Calculate points from Qualifying session -- receive driver info and teammate Qualifying result.
function calculateQualyPoints(driver, mate_qualy) {
    const {
        qualy,
        qualy_streak
    } = driver;

    //Compute points according to driver result on Qualifying
    let pointsDriver = QUALIFYING_POINTS[qualy];

    //Compute points to Team unless driver didn't finish the race (DNQ, DNS or DSQ result in negative points)
    let pointsCr = Math.max(pointsDriver, 0);

    //Add points from being ahead of teammate, if both drivers don't finish the race, neither drive score points.
    if (qualy != DNQ && qualy != DNS && qualy != DSQ) {
        if (mate_qualy == DNQ || mate_qualy == DNS || mate_qualy == DSQ || qualy < mate_qualy) {
            pointsDriver += QUALY_AHEAD_OF_MATE;
        }
    }

    //Add Streak points from qualifying
    if (qualy_streak == STREAK_LENGHT_DRIVER) {
        pointsDriver += STREAK_QUALY_TOP_10_DRIVER;
    }

    return {driver: pointsDriver, constructor: pointsCr};;
}

//Calculate points from Qualifying session -- receive driver info and teammate Race result.
function calculateRacePoints(driver, mate_race_finish) {
    const {
        race_start,
        race_finish,
        fastest_lap,
        race_streak
    } = driver;

    let pointsCr = 0;
    //Compute points according to driver result on Qualifying
    let pointsDriver = RACE_POINTS[race_finish];

    //If drive finish the race, calculate position-change and ahead-of-teammate points.
    if (race_finish != DNF && race_finish != DNS && race_finish != DSQ) {

        //Add/Remove points based on position change from Start to End of the race
        pointsDriver += calculatePositionChangePoints(race_start, race_finish);
        //Points Added to TEAM unless driver didn't finish the race.
        pointsCr = pointsDriver;

         //Add points from being ahead of teammate, if both are DNQ, DNS or DSQ, neither drive score points.
        if (mate_race_finish == DNF || mate_race_finish == DNS || mate_race_finish == DSQ || race_finish < mate_race_finish) {
            pointsDriver += RACE_AHEAD_OF_MATE;
        }
    }

    //App points if achieved fastest lap
    pointsDriver += fastest_lap ? FASTEST_LAP : 0;

    //Add Streak points from race
    if (race_streak == STREAK_LENGHT_DRIVER) {
        pointsDriver += STREAK_RACE_TOP_10_DRIVER;
    }

    return {driver: pointsDriver, constructor: pointsCr};
}

//Calculate points for positions gained or lost -- receiver driver position at Start and End of race.
function calculatePositionChangePoints(raceStartPos, raceFinishPos) {
    let points = 0;
    //Restrict position change to range that compute points from max_pos_change_loss to max_pos_change_gain
    const posChange = Math.min(Math.max(raceStartPos - raceFinishPos, MAX_POS_CHANGE_LOSS), MAX_POS_CHANGE_GAIN)

    //Compute points if gained position
    if (posChange > 0) {
        points = posChange * POSITION_GAINED;
    } else {
        //If Lost position verify of started within Top 10 and compute points accordingly
        if (raceStartPos > 10) {
            points = posChange * POSITION_LOST_BOTTOM_10;
        } else {
            points = posChange * POSITION_LOST_TOP_10;
        }
    }

    return points;
}

export default calculateRaceWeekPoints;