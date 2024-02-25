var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

<<<<<<< Updated upstream
const { connectDB } = require("./routes/dbConnect");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const boardRouter = require("./routes/board");
const noticeRouter = require("./routes/notice");
const assignmentRouter = require("./routes/assignment");
=======
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
>>>>>>> Stashed changes

var app = express();
connectDB();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

<<<<<<< Updated upstream
app.use("/api", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/board", boardRouter);
app.use("/api/notice", noticeRouter);
app.use("/api/assignment", assignmentRouter);
=======
app.use('/', indexRouter);
app.use('/users', usersRouter);
>>>>>>> Stashed changes

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
