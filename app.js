const express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mysql = require('mysql');
const port = process.env.PORT || 3000;

//var users = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/bewohner', require('./routes/bewohner'));
//app.use('/pfleger', require('./routes/pfleger'));

//DB connection for plesk
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'alexa_db_user',
  password : '10iw?i3I',
  database : 'cm_alexa'
});

//Connect
db.connect((err) => {
  if(err){
      throw err;
  }
  console.log('MySQL Connected');
});

//Select all records from pfleger
app.get('/', function(req, res, next) {
	db.query('SELECT * FROM pfleger', function (err, results) {
        if (err) throw err;
        res.type('application/json').send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});

//Select a single record from pfleger
app.get('/:id', function(req, res, next) {
	db.query(`SELECT * FROM pfleger WHERE pfleger_id = ${req.params.id}`, function (err, results) {
		if (err) throw err;
		res.type('application/json').send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Unknown Request');
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