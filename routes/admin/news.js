var express = require('express');
var router = express.Router();
var newsModel = require('../../models/newsModel');

///*
router.get('/', function(req , res, next){
    res.render('admin/news',{
        layout: 'admin/layout',
        usuario: req.session.nombre,
        });
});

module.exports = router;
//*/

/*
router.get('/', async function(req , res, next){
    var news =  await newsModel.getNovedades();

    res.render('admin/news',{
        layout: 'admin/layout',
        usuario: req.session.nombre,
        novedades
        });
});

module.exports = router;
*/