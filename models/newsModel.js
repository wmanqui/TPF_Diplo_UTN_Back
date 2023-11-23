var pool = require('./bd');

//Incorporamos todas las funciones necesarias para realizar consultas

async function getNovedades(){
    var query = "select * from novedades order by id desc";
    var rows = await pool.query(query);
    return rows;   
}

module.exports = {getNovedades}