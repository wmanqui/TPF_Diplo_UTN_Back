var express = require('express');
var router = express.Router();

//Me permite utilizar las funciones creadas en el archivo usersModel
var usersModel = require('./../../models/usersModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/login', { layout: 'admin/layout' });
});


router.post('/', async (req, res, next) => {
  try{
    var usuario = req.body.usuario;        //Captura nombre de usuario
    var password = req.body.password;   //Captura contraseña
    var data = await usersModel.getUserByUsernameAndPassword(usuario,password);
    if (data != undefined){
      req.session.id_usuario = data.id;
      req.session.nombre = data.usuario;
      res.redirect('/admin/news');  //Redirecciona a la pagina de novedades
    }else{
      res.render('admin/login',{
        layout: 'admin/layout',
        error: true
      });
    }
  } catch(error){
      console.log(error);
  }

})

module.exports = router;