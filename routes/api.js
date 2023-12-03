var express = require('express');
var router = express.Router();
var newsModel = require('./../models/novedadesModel');
var nodemailer = require('nodemailer');
var cloudinary = require('cloudinary').v2;

//Codigo para las novedades
router.get('/novedades',async function (req,res,next){
    let novedades = await newsModel.getNovedades();

    novedades = novedades.map(novedades => {
        if (novedades.img_id){
            const imagen = cloudinary.url(novedades.img_id, {
                width: 960,
                height: 200,
                crop:'fill'
            });
            return{
                ...novedades,
                imagen
            }
        }else{
            return{
                ...novedades,
                imagen:''
            }
        }
    });
    res.json(novedades);
});






//Codigo para el envio de mail

router.post('/contact', async (req, res) => {
    const mail = {                                  //Captura los datos del formulario y conforma el mail a ser enviado
        to: 'wmanqui@gmail.com',
        subject: 'Contacto web',
        html: `${req.body.nombre} se contacto a traves de la web y quiere más información a este correo: ${req.body.email}  <br> Su telefono es ${req.body.telefono}`,
        text: `${req.body.mensaje}`
    }
    const transport = nodemailer.createTransport({  //Toma los datos de configuracion guardados en las variables de entorno
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
    });

    await transport.sendMail(mail)      //Envia el correo electronico

    res.status(201).json({
        error: false,
        message: 'Mensaje enviado'
    });
    
});

module.exports = router;