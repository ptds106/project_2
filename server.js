var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var cookieParser = require('cookie-parser');
const methodOverride = require('method-override')


require('dotenv').config();
require('./config/passport');
var app = express();
require('./config/database');



var indexRouter = require('./routes/index');
var historyRouter = require('./routes/histories/');
const ancientsRouter = require('./routes/ancients')
const medivalsRouter = require('./routes/medivals')
const modernsRouter = require('./routes/moderns')
const contemporariesRouter = require('./routes/contemporaries')


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'SEIRocks!',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'))


app.use('/', indexRouter);
app.use('/', historyRouter);
app.use('/ancients', ancientsRouter)
app.use('/medivals', medivalsRouter)
app.use('/moderns', modernsRouter)
app.use('/contemporaries', contemporariesRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
