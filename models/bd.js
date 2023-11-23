var mysql = require('mysql');
var util = require('util');

// Creo un grupo de conexiones, utilizando los datos cargados en el archivo ".env" 
var pool =mysql.createPool({
    connectionLimit:10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB_NAME
});

pool.query = util.promisify(pool.query);

//Exporto la variable pool para incluirla donde necesito hacer uso de la base de datos 
module.exports = pool; 
