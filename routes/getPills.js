var express = require('express');
var router = express.Router();
var cors = require('cors');

var pg = require('pg');
router.get('/', cors(), function(req, res) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT pill_name FROM pill', function(err, result) {
      done();
      if (err){ 
        console.error(err); 
        res.send("Error " + err); 
      }
      else{
        var pillNames = [];
        result.rows.forEach(function(row){
          pillNames.push(row.pill_name);
        });
        res.send(pillNames); 
      }
    });
  });

});

module.exports = router;
