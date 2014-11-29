// TODO: CREATE A UNIT TEST FROM THIS
// http://127.0.0.1:3000/add/comment
// Content-Type: application/json
// {
//     "title": "this is such an awesome comment",
//     "storyId": 9980808,
//     "userId": 509080
// }

var express = require('express');
var router = express.Router();
var pg = require('pg');
var $q = require('q');


function addComment(text, storyId, userId){
    var deferred = $q.defer(); 
    var sqlInsertComment = "INSERT INTO comment (comment_text, comment_date_created, comment_story_id, comment_user_id) VALUES ('"+text+"',now(),"+storyId+","+userId+");"

    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query(sqlInsertComment, function(err, result) {
            done();
            if (err){ 
                deferred.resolve(err);
            } else{
                deferred.resolve(result.fields);
            }
        });
    });

    return deferred.promise;
}


router.post('/', function(req, res) {
    var promise = addComment(
        req.body.title, 
        req.body.storyId, 
        req.body.userId
    );

    promise.then(function(result){
        if (JSON.stringify(result) === '[]'){
            res.send('success');
        } else{
            console.log(result);
            res.send('failure')
        }
    });
});

module.exports = router;