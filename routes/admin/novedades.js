var express = require('express');
var router = express.Router();
var newsModel = require('../../models/novedadesModel');

/*
router.get('/', function(req , res, next){
    res.render('admin/news',{
        layout: 'admin/layout',
        usuario: req.session.nombre,
        });
});

module.exports = router;
*/

///*
router.get('/', async function(req , res, next){
    var novedades =  await newsModel.getNovedades();

        res.render('admin/novedades', {
            layout: 'admin/layout',
            usuario: req.session.nombre,
            novedades
        });
});

module.exports = router;
//*/