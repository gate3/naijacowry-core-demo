require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
//const path = require('path');
require('./src/helpers/db.helper');
const cluster = require('cluster');
const mws = require('./config/middlewares');

if(cluster.isMaster){
  const aw = require('./initAwilix')
  aw.initialize()
  const cont = aw.container;
  //const redisHelper = cont.resolve('cacheHelper')
  //redisHelper.getValueFromSet(redisHelper.CONSTANTS.USERNAMES)
             //.then(console.log, console.error)
  //redisHelper.addToSet(redisHelper.CONSTANTS.USERNAMES, 'dotin').then(console.log, console.error)
  //console.log(cont.registrations)
  /* cont.resolve('loginCtrl')({username:'doyinolarewaju', password:'2222'})
      .then(console.log, console.error) */
  
  /* cont.resolve('signupCtrl')(
    {username:'doyinolarewaju3',first_name: 'dddd', last_name:'ddd', password:'2222'}
  ) */
  /* cont.resolve('forgotPasswordCtrl')(
    {username:'doyinolarewaju'}
  ).then(console.log, console.error) */
}

/* const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users'); */

const app = express();
/* app.get('/user/new', (req, res)=> res.render('signup'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); */

app.use(mws);


//app.use(express.static(path.join(__dirname, 'public')));

/* app.use('/', indexRouter);
app.use('/users', usersRouter); */

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
  //res.render('error');
});

module.exports = app;
