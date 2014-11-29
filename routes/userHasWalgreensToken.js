// TODO: CREATE A UNIT TEST FROM THIS
// http://127.0.0.1:3000/userHasWalgreensToken
// Content-Type: application/json
// {
//     "session": "1416864262772"
// }

var express = require('express');
var router = express.Router();
var getUser = require('../scripts/getUser').getUser
var pg = require('pg');
var $q = require('q');

function hasToken(session){
    var deferred = $q.defer(); 
    var hasTokenSQL = "select user_wallgreens_token from users where user_session='"+session+"';"

    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query(hasTokenSQL, function(err, result) {
            done();
            if (err){ 
                console.log(err);
                deferred.resolve(false);
            } else{
                if (result.rows.length === 0){
                    deferred.resolve(false);
                } else if (result.rows[0].user_wallgreens_token === null){
                    deferred.resolve(false);
                } else{
                    deferred.resolve(true);
                }
            }
        });
    });

    return deferred.promise;
}

/* GET home page. */
router.post('/', function(req, res) {
    hasToken(req.body.session).then(function(responseHasSession){
        res.send(responseHasSession);
    });
});

module.exports = router;
