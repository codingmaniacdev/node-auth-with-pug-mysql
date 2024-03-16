var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { Sequelize } = require('sequelize');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// Sequelize setup
// const env = process.env.NODE_ENV || 'development';
// const config = require('./config/config.json')[env];
// const sequelize = new Sequelize(config.database, config.username, config.password, config);
// const { Model } = require('./models/index');
// Model.init(sequelize);

// const { User } = require('./models/User');
// User.init(sequelize);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

// Sequelize.sync().then(() => {
//   console.log('Database is synced.');
// });

module.exports = app;
