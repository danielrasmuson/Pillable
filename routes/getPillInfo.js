var express = require('express');
var router = express.Router();
var pg = require('pg');
var $q = require('q');
var cors = require('cors');

// THE BELOW ROUTES RETURNS THIS
// "description": "commonly used for anxiety",
// "information": "http://pillbox.nlm.nih.gov/pillimage/search.php",
// "stories": [
//     {
//         "story_id": 1,
//         "comment": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi rem dolores possimus, magni porro similique ipsum dignissimos perferendis dicta ab saepe excepturi cumque facilis earum nemo maxime nam architecto laudantium.",
//         "difficulty": 50,
//         "moodChange": 69,
//         "profile": {
//             "image": "img/danielRasmuson.jpg",
//             "name": "Daniel Rasmuson"
//         },
//         "satisfaction": 60,
//         "weightChange": 40
//     },
//     {
//         "story_id": 2,
//         "comment": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi rem dolores possimus, magni porro similique ipsum dignissimos perferendis dicta ab saepe excepturi cumque facilis earum nemo maxime nam architecto laudantium.",
//         "difficulty": 40,
//         "moodChange": 29,
//         "profile": {
//             "image": "img/peteKane.jpeg",
//             "name": "Pete Kane"
//         },
//         "satisfaction": 30,
//         "weightChange": 10
//     },
//     {
//         "story_id": 3,
//         "comment": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi rem dolores possimus, magni porro similique ipsum dignissimos perferendis dicta ab saepe excepturi cumque facilis earum nemo maxime nam architecto laudantium.",
//         "difficulty": 80,
//         "moodChange": 119,
//         "profile": {
//             "image": "img/DrewPowell.jpg",
//             "name": "Drew Powell"
//         },
//         "satisfaction": 100,
//         "weightChange": 0
//     }
// ]

function getStories(client, pillId){
  var deferred = $q.defer(); 

  client.query("select * from story where story_pill_id = '"+pillId+"';", function(err, storyData) {
    if (err){
      deferred.resolve(err);
    }
    else{
      var stories = [];
      storyData.rows.forEach(function(row){
        stories.push({
          "story_id": row.story_id,
          "comment": row.story_body,
          "difficulty": row.story_difficulty,
          "moodChange": row.story_mood_change,
          "profile": {
            "name": "John Doe",
            "user_id": row.story_user_id,
            "image": "http://placehold.it/350x350"
          },
          "satisfaction": row.story_satisfaction,
          "weightChange": row.story_weight_change
        })
      });
      deferred.resolve(stories);
    }
  });

  return deferred.promise;
}


// todo seems llike you should be able to do this one query
function getPillInfo(pillName){
  var deferred = $q.defer(); 

  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    // client.query("SELECT * FROM pill LEFT JOIN story on pill.pill_id = story.story_pill_id WHERE pill.pill_name='"+pillName+"'", function(err, result) {
    client.query("SELECT * FROM pill WHERE pill.pill_name='"+pillName+"'", function(err, pillData) {
      if (err){
        deferred.resolve(error(err));
      }
      else{
        if (pillData.rows.length > 1){
          deferred.resolve('The pill results are more then one!');
        } else if (pillData.rows.length === 0){
          deferred.resolve('ERROR: '+pillName+' not found in database pills.')
        } else{
          var pill = pillData.rows[0];
          getStories(client, pill.pill_id).then(function(stories){
            pill.stories = stories;
            deferred.resolve(pill);
          });
        }
      }
    });
  });

  return deferred.promise;
}


router.get('/', cors(), function(req, res) {
    var pillName = req.originalUrl.split('/').pop();
    getPillInfo(pillName).then(function(pillInfo){
      if (pillInfo.pill_id !== undefined){
        var pillData = {
          pillId: pillInfo.pill_id,
          description: pillInfo.pill_desc,
          information: "http://www.drugs.com/"+pillInfo.pill_name+".html",
          stories: pillInfo.stories
        };
        res.send(pillData);
      } else{
        var error = pillInfo;
        res.send(pillInfo);
      }
    });
});

module.exports = router;
