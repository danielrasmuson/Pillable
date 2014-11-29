var pg = require('pg');
var $q = require('q');

function getToken(userId){
    var deferred = $q.defer(); 

    var getTokenSQL = "select user_wallgreens_token from users where user_id="+userId+";"

    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query(getTokenSQL, function(err, result) {
            if (err){ 
                if (err.routine === 'errorMissingColumn'){
                    deferred.resolve('walgreens token missing')
                } else{
                    deferred.resolve(err);
                }
                done();
            } else{
                if (result.rows.length == 0){
                    console.log('Token Not found for UserID: '+userId);
                    deferred.resolve(false);
                    done();
                } else{
                    deferred.resolve(result.rows[0].user_wallgreens_token);
                    done();
                }
            }
        });
    });

    return deferred.promise;
}

exports.getToken = getToken;