var fs = require('fs');
var pg = require('pg');

function getSQLForInsertPill(pill){
    return "INSERT INTO pill (pill_name, pill_desc) VALUES ('"+pill+"', 'Pill Descriptions will be added at a later date')";
}

// pg.connect(process.env.DATABASE_URL, function(err, client, done) {
fs.readFile("pills.txt", "utf8", function (error, data) {
    var pills = data.split('\n');
    for (var i = 0; i < pills.length; i++) {
        // client.query(getSQLForInsertPill(pills[i]), function(err, result) {
        console.log(getSQLForInsertPill(pills[i]));
            // done();
        // });
    };
});
// });



