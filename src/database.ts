import mysql from 'promise-mysql';
const keys = {
    host:'localhost',
    user:'root',
    password:'root',
    database:'p1',
    multipleStatements:true
}
const pool = mysql.createPool(keys);
 //npm i promise-mysql@3.3.1    necesito esto para que jale la conexion 
pool.getConnection().
then(connection => {
    pool.releaseConnection(connection);
    console.log("BASE DE DATOS CONECTADA")
});
export default pool; 