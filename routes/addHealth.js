// TODO: CREATE A UNIT TEST FROM THIS
// http://127.0.0.1:3000/add/health
// Content-Type: application/json
// {
//     "weight": 100,
//     "bloodPressure": 100,
//     "glucose": 100,
//     "session": '834759847357' 
// }


var express = require('express');

var router = express.Router();
var pg = require('pg');
var $q = require('q');
var unirest = require('unirest');
var syncHealthDataWithWalgreens = require('../scripts/walgreensBalanceRewards').syncHealthDataWithWalgreens
var getUser = require('../scripts/getUser').getUser
var getToken = require('../scripts/getToken').getToken

function addHealthDataToDatabase(userId, weight, bloodPressure, glucose){
    var deferred = $q.defer();
    var sqlInsertComment = "INSERT INTO userHealth (userHealth_weight, userHealth_blood_pressure, userHealth_blood_glucose, userHealth_user_id) VALUES ("+weight+","+bloodPressure+","+glucose+","+userId+")";

    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query(sqlInsertComment, function(err, result) {
            done();
            if (err){
                deferred.resolve(err);
            } else{
                deferred.resolve('200');
            }
        });
    });

    return deferred.promise;
}

function addHealthData(userId, token, weight, bloodPressure, glucose){
    var deferred = $q.defer();

    syncHealthDataWithWalgreens(token, weight, bloodPressure, glucose).then(function(success){
        if (success){
            addHealthDataToDatabase(userId, weight, bloodPressure, glucose).then(function(addedToDatabase){
                deferred.resolve(addedToDatabase)
            });
        } else{
            console.log('Error: Walgreens post failed!');
            deferred.resolve(false);
        }
    });


    
    return deferred.promise;
}

// todo you're going to have to fix the expires date time stamp, I just passed in now()
router.post('/', function(req, res) {

    getUser(req.body.session).then(function(userId){
        getToken(userId).then(function(token){
            if (token === 'walgreens token missing' || token === null){
                res.send('walgreens token missing')
            } else{
                console.log(token);
                addHealthData(
                    userId,
                    token,
                    req.body.weight,
                    req.body.bloodPressure,
                    req.body.glucose
                ).then(function(resultBoolean){
                    if (resultBoolean){
                        res.send(resultBoolean);
                    } else{
                        res.send('failure');
                    }
                });
            }
        });
    });

});

module.exports = router;