var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var parseString = require('xml2js').parseString;
var $q = require('q');

/*
 *   Will return the first valid pill with an image to the query
 */
function getPillData(pillName){
    var apiKey = "V02YMF99AA";
    var getUrl = "http://pillbox.nlm.nih.gov/PHP/pillboxAPIService.php?key="+apiKey+"&ingredient="+pillName;

    var deferred = $q.defer(); 

    unirest.get(getUrl).end(function(response){
        if (response.raw_body === undefined){
            deferred.resolve(false);
            return;
        }

        parseString(response.raw_body, function (err, result) {
            if (result.Pills.pill == undefined){
                deferred.resolve(false);
            }
            for (var pill in result.Pills.pill){
                var pillData = result.Pills.pill[pill];
                if (parseInt(pillData.HAS_IMAGE)){
                    deferred.resolve(pillData);
                }
            }
            deferred.resolve(false);
        });
    })

    return deferred.promise;
}

function getImage(pillName){
    var deferred = $q.defer(); 

    getPillData(pillName).then(function(pillData){
        if (pillData){
            deferred.resolve("http://pillbox.nlm.nih.gov/assets/small/"+pillData.image_id+".jpg");
        } else{
            deferred.resolve(false)
        }
    });

    return deferred.promise;
}

/* GET users listing. */
router.get('/', function(req, res) {
    var pillName = req.originalUrl.split('/').pop();
    getImage(pillName).then(function(imageUrl){
        res.send(imageUrl);
    });
});

module.exports = router;