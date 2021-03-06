const express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

//const expressSession = require('express-session');

const app = express();  //von const auf var geändert

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '1mb' }));
//app.use(expressSession({secret: 'max', saveUninitalized: false, resave: false}));

app.use('/bewohner', require('./routes/bewohner'));
app.use('/pfleger', require('./routes/pfleger'));
app.use('/kontaktperson', require('./routes/kontaktperson'));
app.use('/user', require('./routes/user'));
app.use('/vitalwert', require('./routes/vitalwert'));

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