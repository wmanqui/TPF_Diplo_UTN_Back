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

//Realizo la consulta para eliminar registros de la base de datos
async function deleteNovedadadById(id){
    var query = "delete from novedades where id = ? ";
    var rows = await pool.query (query, [id]);
    return rows; 
}




module.exports = {getNovedades,insertNovedad}