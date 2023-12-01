/*
const { Router } = require('express');
var fileUpload = require('express-fileupload');

application.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

//Para ser copiado en view/admin/agregar.hbs
//<form action= '/admin/novedades/agregar' method='post' enxtype='multipart/form-data'/>

<div class = 'form-group'>
    <label>imagen: <input type ="file" name="imagen" id="imagen"/> </label>
</div>

//Para ser copiado en routes/admin/novedades.js
var util = require('util');
var cloudinary = require('cloudinary').v2;

const uploader = util.promisify(cloudinary.uploader.upload);

router.post('/agregar', async (req, res, next) => {
    try{
        var img_id='';
        if(req.files && Object.keys(req.files).lenght >0){
            imagen = req.files.imagen;
            imd_id = (await uploader(imagen.tempFilePath)).public_id;
        }
    }

})
*/