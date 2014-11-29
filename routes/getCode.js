// TODO: CREATE A UNIT TEST FROM THIS
// http://127.0.0.1:3000/getCode
// Content-Type: application/json
// {
//     "session": "1416880163023"
// }


var express = require('express');
var router = express.Router();
var getUser = require('../scripts/getUser').getUser

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getOAuthUrl(userId, hostedDomain, transactionId){
    return "https://walgreens.com/oauth/authorize.jsp?client_id=pllpdse&response_type=code&scope=steps&channel=5&redirect_uri="+hostedDomain+"/callBack&transaction_id="+transactionId+"&state="+userId;
}

/* GET home page. */
router.post('/', function(req, res) {
    getUser(req.body.session).then(function(userId){
        var oauthUrl = getOAuthUrl(userId, "https://aqueous-temple-8608.herokuapp.com", getRandomInt(0, 10000000));
        console.log('here is the url: '+oauthUrl);
        res.send(oauthUrl);
    });
});

module.exports = router;
