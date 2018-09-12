var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var scheduler = require('./routes/reminderEmail');


//Use of exported routers
//var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login1');
var usersRouter = require('./routes/users');
var instituteRouter = require('./routes/institutes');
var categoryRouter = require('./routes/categories');
var testimonialsRouter = require('./routes/testimonials');
var skillListRouter = require('./routes/skillList');
var appointmentRouter = require('./routes/appointment');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/institutes', instituteRouter);
app.use('/skillList', skillListRouter);
app.use('/categories', categoryRouter);
app.use('/skillList/skill', skillListRouter);
app.use('/login', loginRouter);
app.use('/testimonials', testimonialsRouter);
app.use('/appointment', appointmentRouter);


//routes for static HTML with no dynamic data
app.get('/', (req, res) => {
  res.render('home', { title: 'Home Page' });
  res.end();
});

app.get('/features', (req, res) => {
  res.render('features', { title: 'Why us?' });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// FB.getLoginStatus(function (response) {
//   statusChangeCallback(response);
// });

//uncomment this line to enable schedule reminder
//scheduler();
module.exports = app;
