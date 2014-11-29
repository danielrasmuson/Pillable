// TODO: CREATE A UNIT TEST FROM THIS
// http://127.0.0.1:3000/add/user
// Content-Type: application/json
// {
//     "firstName": "daniel",
//     "lastName": "rasmusn",
//     "email": "dan123911@gmail.com",
//      "password": "test123"
// }

var express = require('express');
var router = express.Router();
var pg = require('pg');
var $q = require('q');

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function addUser(firstName, lastName, email, password){
    var deferred = $q.defer(); 

    console.log('here');

    var now = new Date().getTime()+getRandomInt(0, 10000000);


    // todo note I'm saying every session expires now
    var sqlInsertComment = "INSERT INTO users (user_first_name, user_last_name, user_email, user_password, user_date_created, user_session, user_session_expires) VALUES ('"+firstName+"', '"+lastName+"','"+email+"','"+password+"',now(),'"+now+"','"+now+"');";

    console.log(sqlInsertComment);

    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query(sqlInsertComment, function(err, result) {
            done();
            if (err){ 
                console.log(err);
                deferred.resolve('failure');
            } else{
                deferred.resolve(now);
            }
        });
    });

    return deferred.promise;
}


// todo you're going to have to fix the expires date time stamp, I just passed in now()
router.post('/', function(req, res) {
    var promise = addUser(
        req.body.firstName, 
        req.body.lastName, 
        req.body.email, 
        req.body.password 
    );

    promise.then(function(result){
        if (result !== 'failure'){
            // res.send('success');
            res.send(JSON.stringify(result))
        } else{
            res.send('failure')
        }
    });
});

module.exports = router;