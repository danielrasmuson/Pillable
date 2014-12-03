var express = require('express');
var router = express.Router();
var pg = require('pg');
var $q = require('q');
var cors = require('cors');

// {
//     "story_id": 1,
//     "title": "ksldjfaldjs",
//     "comment": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi rem dolores possimus, magni porro similique ipsum dignissimos perferendis dicta ab saepe excepturi cumque facilis earum nemo maxime nam architecto laudantium.",
//     "difficulty": 50,
//     "moodChange": 69,
//     "profile": {
//         "image": "img/danielRasmuson.jpg",
//         "name": "Daniel Rasmuson"
//     },
//     "satisfaction": 60,
//     "weightChange": 40
// },

function getStoryInfo(storyId){
  var deferred = $q.defer(); 

  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query("SELECT * FROM story WHERE story_id="+storyId+";", function(err, storyData) {
      if (err){
        deferred.resolve(error(err));
      }
      else{
        if (storyData.rows.length > 1){
            deferred.resolve('The story results are more then one!');
        } else if (storyData.rows.length === 0){
            deferred.resolve('ERROR: '+storyId+' not found in database story.')
        } else{
            deferred.resolve(storyData.rows[0]);
        }
      }
    });
  });

  return deferred.promise;
}


router.get('/', cors(), function(req, res) {
    var storyId = req.originalUrl.split('/').pop();
    getStoryInfo(storyId).then(function(storyInfo){
      var story = {
        "title": storyInfo.story_title,
        "comment": storyInfo.story_body,
        "difficulty": storyInfo.story_difficulty,
        "moodChange": storyInfo.story_mood_change,
        "satisfaction": storyInfo.story_satisfaction,
        "weightChange": storyInfo.story_weight_change
      }
      res.send(story);
    });
});

module.exports = router;
