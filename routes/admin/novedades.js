var express = require('express');
var router = express.Router();
var newsModel = require('../../models/novedadesModel');
const util = require('util');
const cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);


//Este controlador nos permite listar la novedades
router.get('/', async function(req , res, next){
    var novedades =  await newsModel.getNovedades();

    novedades = novedades.map(novedad => {
        if(novedad.img_id){
            const imagen = cloudinary.image(novedad.img_id,{
                width: 50,
                height:50,
                crop: 'fill' //pad
            });
            return{
                ...novedad,
                imagen
            }
        }else{
            return{
                ...novedad,
                imagen:''
            }
        }
    });

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
        var img_id = '';
        if(req.files && Object.keys(req.files).length > 0){
            imagen = req.files.imagen;
            img_id = (await uploader(imagen.tempFilePath)).public_id;
        }
        if(req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != ""){
            await newsModel.insertNovedad({
                ...req.body,
                img_id
            });
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

    let novedad = await newsModel.getNovedadById(id);
    if (novedad.img_id){
        await(destroy(novedad.img_id));
    }

    await newsModel.deleteNovedadById(id);
    res.redirect('/admin/novedades')
});


//Este controlador trae el diseño de una sola novedad
//para que yo puedad modificarlo


router.get('/modificar/:id', async (req, res, next) =>{
    var id = req.params.id;
    console.log(req.params.id);
    var novedad = await newsModel.getNovedadById(id);
    res.render('admin/modificar',{
        layout: 'admin/layout',
        novedad
     });
});

router.post('/modificar', async (req, res, next) => {
    try{
        let img_id = req.body.img_original;
        let borrar_img_vieja = false;
        if (req.body.img_delete === "1"){
            img_id = null;
            borrar_img_vieja = true;
        }else{
            if(req.files && Object.keys(req.files).length >0) {
                imagen = req.files.imagen;
                img_id = (await uploader(imagen.tempFilePath)).public_id;
                borrar_img_vieja = true;
            }
        }
        if (borrar_img_vieja && req.body.img_original){
            await(destroy(req.body.img_original));
        }
      let obj = {
        titulo: req.body.titulo,
        subtitulo: req.body.subtitulo,
        cuerpo: req.body.cuerpo,
        img_id
      }
      await newsModel.modificarNovedadById(obj, req.body.id);
      res.redirect('/admin/novedades');
    }
    catch(error){
        console.log(error)
        res.render('admin/modificar',{
            layout: 'admin/layout',
            error: true, message: 'No se modifico la novedad'
        })
    }
});


module.exports = router;

