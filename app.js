var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var fileUpload = require('express-fileupload');

//LLamo libreria que permite extraer datos del archivo .env
require('dotenv').config();
//Genero variable para trabajar con sesiones
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//Genero variable "loginRouter"
var loginRouter = require('./routes/admin/login'); 
//Genero la variable "adminRouter"
var adminRouter = require('./routes/admin/novedades');
//Genero la variable "apiRouter"
var apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Codigo para trabajar con sesiones
app.use(session({
  secret: 'hjasdiuwuyeq78we',
  cookie: {maxAge: null},
  resave: false,
  saveUninitialized: true
}));

//Variable de seguridad
secured = async (req, res, next) =>{
  try{
    console.log(req.session.id_usuario);
    if (req.session.id_usuario){
      next();
    }else {
      res.redirect('/admin/login');
    }
    } catch (error){
      console.log(error);
    }
  }

//Codigo para trabajar con imagenes
  app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));




app.use('/', indexRouter);
app.use('/users', usersRouter);
//Indico en que momento voy a utilizar la variable "loginRouter"
app.use('/admin/login', loginRouter); 
//Indico que primero ejecuto la variavle "secured" y luego la variable "adminRouter"
app.use('/admin/novedades',secured, adminRouter);
//Indico en que momento voy a utilizar la variable "apiRouter"
app.use('/api',cors(),apiRouter);
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
