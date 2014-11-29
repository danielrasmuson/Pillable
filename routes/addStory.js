// TODO: CREATE A UNIT TEST FROM THIS
// http://127.0.0.1:3000/add/story
// Content-Type: application/json
// {
//     "title": "automated title",
//     "body": "hello",
//     "difficulty": 50,
//     "weightChange": 50,
//     "moodChange": 50,
//     "satisfaction": 50,
//     "userId": 230948293084,
//     "pillId": 2038402983
// }

var express = require('express');
var router = express.Router();
var pg = require('pg');
var $q = require('q');

function addStory(title, body, difficulty, weightChange, moodChange, satisfaction, userId, pillId){
    var deferred = $q.defer(); 
    var sqlInsertComment = "INSERT INTO story (story_title, story_body, story_date_created, story_difficulty, story_weight_change, story_mood_change, story_satisfaction, story_user_id, story_pill_id) VALUES ('"+title+"','"+body+"',now(),"+difficulty+","+weightChange+","+moodChange+","+satisfaction+","+userId+","+pillId+");"

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
    var promise = addStory(
        req.body.title, 
        req.body.comment, 
        req.body.difficulty, 
        req.body.weightChange, 
        req.body.moodChange, 
        req.body.satisfaction, 
        req.body.userId, 
        req.body.pillId
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