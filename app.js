const createError = require('http-errors');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const slackbotApiRouter = require('./routes/index/general');



//Kick everything off by instantiating Express!
var app = express();


//CALL MIDDLEWARE METHODS

//Set up the logger. Not fully sure what this does. It was added in the boilerplate.
app.use(logger('dev'));

//Calling this built-in method allows us to recognize incoming request objects as JSON.
// app.use(express.json());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

//Calling this built-in method allows us to parse urlencoded request bodies.
app.use(express.urlencoded({ extended: false }));

//We implemented this method. Calling it allows us to parse cookies easier in the code.
app.use(cookieParser());


//SET UP ROUTERS

//This part allows us to create deep, complex subsections of the site 
// without piling everything into index.js.
app.use('/', slackbotApiRouter);


// Catch 404s and forward them to the error handler.
app.use(function (req, res, next) {
  next(createError(404));
});

// Handle errors by spitting them out if on dev.
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app