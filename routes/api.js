var express = require('express');
var router = express.Router();
var newsModel = require('./../models/novedadesModel');

router.get('/novedades',async function (req,res,next){
    let novedades = await newsModel.getNovedades();
    res.json(novedades);
});

module.exports = router;