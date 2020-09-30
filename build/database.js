"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_mysql_1 = __importDefault(require("promise-mysql"));
const keys = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'p1',
    multipleStatements: true
};
const pool = promise_mysql_1.default.createPool(keys);
//npm i promise-mysql@3.3.1    necesito esto para que jale la conexion 
pool.getConnection().
    then(connection => {
    pool.releaseConnection(connection);
    console.log("BASE DE DATOS CONECTADA");
});
exports.default = pool;
