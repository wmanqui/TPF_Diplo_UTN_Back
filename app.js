var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//LLamo libreria que permite extraer datos del archivo .env
require('dotenv').config();
//Genero variable para trabajar con sesiones
var session = require('express-session');

//Genero variable pool, con los datos extraidos de la base de datos           
//var pool = require('./models/bd.js')  

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//Genero variable "loginRouter"
var loginRouter = require('./routes/admin/login'); 
//Genero la variable "adminRouter"
var adminRouter = require('./routes/admin/news');

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
}))

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


app.use('/', indexRouter);
app.use('/users', usersRouter);
//Indico en que momento voy a utilizar la variable "loginRouter"
app.use('/admin/login', loginRouter); 
//Indico en que momento voy a utilizar la variable "adminRouter"
app.use('/admin/news',secured, adminRouter);


/*
//Realizo consulta a la base de datos empleados 
pool.query('select usuario,password from usuarios ').then(function(resultados){
  console.log(resultados)
});
*/


/*
//Inserto datos en la base de datos empleados
var obj = {
  nombre: 'Juan',
  apellido: 'Lopez',
  trabajo: 'docente',
  edad: 38,
  salario: 1500,
  email: 'juanlopez@gmail.com'
}

pool.query('insert into empleados set ?',[obj]).then
(function(resultados){
  console.log(resultados)
});

*/
/*
//Actualizo la base de datos empleados
var id=1;
var obj={
  nombre: 'Pablo',
  apellido: 'Gomez'
}

pool.query('update empleados set? where id_emp=?',[obj,id]).then(function (resultados){
  console.log(resultados);
});
*/

/*
//Borro registros de la base de datos empleados
var id=23;

pool.query('delete from empleados where id_emp=?', [id]).then(function (resultados){
  console.log(resultados);
})
*/

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
