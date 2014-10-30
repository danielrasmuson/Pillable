var express = require('express');
var router = express.Router();
var unirest = require('unirest');



router.post('/', function(req, res) {
  unirest.post('https://services-qa.walgreens.com/api/steps/activity/v1?apiKey=Eu9ZiReoEQbKZu6GQzrJTLW2LsQiKJHk')
  .end(function (response) {
    res.send(response.body);
  });

});

module.exports = router;
