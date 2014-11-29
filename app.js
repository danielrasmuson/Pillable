var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var pillImage = require('./routes/getPillImage');
var pills = require('./routes/getPills');
var pillInfo = require('./routes/getPillInfo');
var addStory = require('./routes/addStory');
var addComment = require('./routes/addComment');
var addUser = require('./routes/addUser');
var addHealth = require('./routes/addHealth');
var login = require('./routes/login');
var getCode = require('./routes/getCode');
var callBack = require('./routes/callBack');
var userHasWalgreensToken = require('./routes/userHasWalgreensToken');

var app = express();
var cors = require('cors');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use('/', routes);
app.use('/pill/img/:name', pillImage);
app.use('/pills', pills);
app.use('/pill/:name', pillInfo);
app.use('/add/story', addStory);
app.use('/add/comment', addComment);
app.use('/add/user', addUser);
app.use('/add/health', addHealth);
app.use('/login', login);
app.use('/callBack', callBack);
app.use('/getCode', getCode);
app.use('/userHasWalgreensToken', userHasWalgreensToken);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
