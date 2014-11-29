var pg = require('pg');
var $q = require('q');

function getUser(session){
    var deferred = $q.defer(); 

    var getUserSQL = "select user_id from users where user_session='"+session+"';"

    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query(getUserSQL, function(err, result) {
            if (err){ 
                deferred.resolve(err);
                done();
            } else{
                if (result.rows.length == 0){
                    deferred.resolve(false);
                    done();
                } else{
                    deferred.resolve(result.rows[0].user_id);
                    done();
                }
            }
        });
    });

    return deferred.promise;
}

// getUser('1416864262772').then(function(userId){
//     console.log(userId);
// });


exports.getUser = getUser;