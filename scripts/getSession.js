var pg = require('pg');
var $q = require('q');

function getSession(userId){
    var deferred = $q.defer(); 

    var getSessionSQL = "select user_session from users where user_id="+userId+";"

    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query(getSessionSQL, function(err, result) {
            if (err){ 
                deferred.resolve(err);
                done();
            } else{
                if (result.rows.length == 0){
                    console.log('Session Not found for UserID: '+userId);
                    deferred.resolve(false);
                    done();
                } else{
                    deferred.resolve(result.rows[0].user_session);
                    done();
                }
            }
        });
    });

    return deferred.promise;
}

exports.getSession = getSession;