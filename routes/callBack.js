var express = require('express');
var router = express.Router();
var url = require('url');
var unirest = require('unirest');
var pg = require('pg');
var getSession = require("../scripts/getSession").getSession;
var getUrls = require("../scripts/UrlService").getUrls;
var $q = require('q');


function addToken(userID, token, expires){
    var deferred = $q.defer(); 
    // todo note I'm saying every session expires now
    console.log(userID);
    console.log(token);
    console.log(expires);
    var addTokenSQL = "UPDATE users SET user_wallgreens_token='"+token+"',user_wallgreens_token_expires='"+expires+"' WHERE user_id="+userID+";";

    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query(addTokenSQL, function(err, result) {
            done();
            if (err){ 
                console.log(err);
                console.log(addTokenSQL);
                deferred.resolve(false);
            } else{
                deferred.resolve(true);
            }
        });
    });

    return deferred.promise;
}


/* GET home page. */
router.get('/', function(req, res) {
    var url_parts = url.parse(req.url, true);
    var urlParams = url_parts.query;

    unirest.post('https://services.walgreens.com/api/oauthtoken/v1')
    .type('x-www-form-urlencoded')
    .send({
      "grant_type": "authorization_code",
      "client_id": "pllpdse",
      "client_secret": "Eu9ZiReoEQbKZu6GQzrJTLW2LsQiKJHk",
      "redirect_uri": getUrls().server+"/callBack",
      "transaction_id": urlParams.transaction_id,
      "channel": 1,
      "act": "getOAuthToken",
      "code": urlParams.code,
      "state": urlParams.state
    })
    .end(function (response) {
        if (response.body.access_token){
            // I'm using state as userID
            var userId = urlParams.state;
            addToken(userId, response.body.access_token, response.body.access_token_expires_in)
            .then(function(success){
                if (success){
                    res.redirect(getUrls().app);
                } else{
                    console.log(success);
                    res.send('failure');
                }
            });
        } else {
            console.log('didnt get token');
            console.log(response.body);
            res.send('failure');
        }
    }) 
});

module.exports = router;



