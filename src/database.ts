import mysql from 'promise-mysql';
import keys from './keys';
const pool = mysql.createPool(keys.database);


 //npm i promise-mysql@3.3.1    necesito esto para que jale la conexion 
pool.getConnection().
then(connection => {
    pool.releaseConnection(connection);
    console.log("BASE DE DATOS CONECTADA")
});

export default pool; 