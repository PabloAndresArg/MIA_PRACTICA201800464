"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
const database_1 = __importDefault(require("../database")); // es el pool 
class IndexController {
    Metodoindex(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //res.send('hola');
            res.json({ text: 'la api esta funcionando Y Conectada' });
            database_1.default.query('DESCRIBE games;');
        });
    }
    MetodocargarTemporal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`
    LOAD DATA LOCAL INFILE '/home/pablo/Documentos/GitHub/MIA_PRACTICA201800464/DataCenterData.csv'
    INTO TABLE temporal
    character set latin1
    FIELDS TERMINATED BY ';'
    LINES TERMINATED BY '\r\n'
    IGNORE 1 lines
    (nombreComp,contactoComp,correoComp,telefonoComp,tipo,nombre,correo,tel,fechaRegistro,direccion,cuidad,codigoPostal,region,producto,categoriaProducto,cantidad,precioUnitario)
    SET fechaRegistro=str_to_date(@var1,'%d%m%Y');
    `);
            res.json('carga de la temporal Realizada correctamente');
        });
    }
    MetodoEliminarTemporal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`TRUNCATE TABLE temporal;`);
            res.json('TABLA TEMPORAL SIN REGISTROS , OK');
        });
    }
}
exports.indexController = new IndexController();
// usa la misma logica que javascript 
// exporta un  objeto que posee ya los metodos 
// se puede en 2 lineas tambien 
//const  indexController = new IndexController();
//export default indexController;
