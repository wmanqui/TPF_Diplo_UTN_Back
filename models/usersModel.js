var pool = require('./bd');
var md5 = require('md5');

//La función getUserByUsernameAndPassword recibe como parámetros el nombre
//de usuario y la contraseña y devuelve, en caso de encontrar una coincidencia en la
//tabla usuarios de nuestra base de datos, la fila correspondiente como un objeto.
//La estructura "try/catch" sirve para interceptar excepciones y que no lleguen al usuario .

async function getUserByUsernameAndPassword(user, password){
    try{
        var query = 'select * from usuarios where usuario = ? and password = ? limit 1';
        var rows = await pool.query(query, [user, md5(password)]);
        return rows[0];
    } catch(error){
        console.log(error);
    }
}

module.exports = { getUserByUsernameAndPassword}



