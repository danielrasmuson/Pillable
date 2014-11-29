// return the session if its a valid email / password
// else return false

var express = require('express');
var router = express.Router();
var pg = require('pg');
var $q = require('q');


function getSession(email, password){
    var deferred = $q.defer(); 
    var sqlFindUser = "select user_session from users where user_email = '"+email+"' and user_password = '"+password+"';";

    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query(sqlFindUser, function(err, result) {
            done();
            if (err){ 
                deferred.resolve(err);
            } else{
                deferred.resolve(result);
            }
        });
    });

    return deferred.promise;
}


// todo you're going to have to fix the expires date time stamp, I just passed in now()
router.post('/', function(req, res) {
    var promise = getSession(
        req.body.email, 
        req.body.password
    );

    promise.then(function(result){
        if (result.rowCount == 0){
            res.send(false);
        } else{
            // todo need a way to update that
            res.send(result.rows[0].user_session);
        }
    });
});

module.exports = router;