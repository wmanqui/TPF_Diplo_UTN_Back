var pool = require('./bd');

//Realizo la consulta para que devuelva todas la novedades
async function getNovedades(){
    var query = "select * from novedades";
    var rows = await pool.query(query);
    return rows;   
}

//Realizo la consulta para insertar una novedad
async function insertNovedad(obj){
    try{
        var query = "insert into novedades set ? ";
        var rows = await pool.query(query,[obj]);
        return rows;
    } catch (error){
        console.log(error);
        throw error;
    }
}

module.exports = {getNovedades,insertNovedad}