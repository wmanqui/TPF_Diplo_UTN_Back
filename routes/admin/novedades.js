var express = require('express');
var router = express.Router();
var newsModel = require('../../models/novedadesModel');


//Este controlador nos permite listar la novedades
router.get('/', async function(req , res, next){
    var novedades =  await newsModel.getNovedades();
        res.render('admin/novedades', {
            layout: 'admin/layout',
            usuario: req.session.nombre,
            novedades
        });
});

//Este controlador nos permite ver el formulario de alta
router.get('/agregar',(req, res, next) =>{
    res.render('admin/agregar',{
        layout: 'admin/layout'
    }); //cierro render
}); //cierro Get


//Este controlador es necesario para capturar los datos ingresados por el usuario,
//validarlos e insertarlos en la base de datos
router.post('/agregar', async (req, res, next) => {
    try{
        if(req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != ""){
            await newsModel.insertNovedad(req.body);
            res.redirect('/admin/novedades')
        }else{
            res.render('admin/agregar',{
                layout: 'admin/layout',
                error: true,message: 'Todos los campos son requeridos'
            })
        }
    }catch(error){
        console.log(error)
        res.render('admin/agregar',{
            layout: 'admin/layout',
            error: true, message: 'No se cargo la novedad'
        });
    }
}); 


//Este controlador captura las rutas de eliminacion, llama a la función para eliminar la base de datos
//y pasa como parametro el valor recibido por la url
router.get('/eliminar/:id', async (req, res, next) => {
    var id = req.params.id;
    await newsModel.deleteNovedadById(id);
    res.redirect('/admin/novedades')
});


//Este controlador imprime el formulario de modificación
router.get('/modificar/:id', async (req, res, next) =>{
    let id = req.params.id;
    let novedad = await newsModel.getNovedadById(id);
    res.render('admin/modificar',{
        layout: 'admin/layout',
        novedad
    });
});


//Este controlador recibe los datos del formulario, 
//pasarlos a la función que modifica la base de datos
router.post('/modificar', async (req, res, next) => {
  //  try{

  //  }
});




module.exports = router;