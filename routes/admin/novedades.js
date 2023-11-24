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

//Este controlaador nos permite ver el formulario de alta
router.get('/agregar',(req, res, next) =>{
    res.render('admin/agregar',{
        layout: 'admin/layout'
    }); //cierro render
}); //cierro Get


//Este controlador es necesario para capturar los datos enviados por el usuario,
//los valida y los inserta en la base de datos
router.post('/agregar', async (req, res, next) => {
    try{
        if(req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != ""){
            await novedadesModel.insertNovedad(req.body);
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

module.exports = router;
