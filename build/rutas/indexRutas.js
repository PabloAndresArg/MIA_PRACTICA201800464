"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); // lo que viene entre llaves si es propio del modulo 
const indexController_1 = require("../controllers/indexController");
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.addRutas();
    }
    addRutas() {
        // this.router.get('/',(req,res)=>{res.send('hola');});
        this.router.get('/', indexController_1.indexController.Metodoindex);
        this.router.get('/cargarTemporal', indexController_1.indexController.MetodocargarTemporal);
        this.router.get('/eliminarTemporal', indexController_1.indexController.MetodoEliminarTemporal);
        this.router.get('/crearTemporal', indexController_1.indexController.crearTemporal);
        this.router.get('/cargarModelo', indexController_1.indexController.crearYcargarModelo);
        this.router.get('/eliminarModelo', indexController_1.indexController.eliminarModelo);
        this.router.get('/consulta1', indexController_1.indexController.consulta1);
        this.router.get('/consulta2', indexController_1.indexController.consulta2);
        this.router.get('/consulta3', indexController_1.indexController.consulta3);
        this.router.get('/consulta4', indexController_1.indexController.consulta4);
        this.router.get('/consulta5', indexController_1.indexController.consulta5);
        this.router.get('/consulta6', indexController_1.indexController.consulta6);
        this.router.get('/consulta7', indexController_1.indexController.consulta7);
        this.router.get('/consulta8', indexController_1.indexController.consulta8);
        this.router.get('/consulta9', indexController_1.indexController.consulta9);
        this.router.get('/consulta10', indexController_1.indexController.consulta10);
        this.router.get('/consulta4/v2', indexController_1.indexController.consulta4_v2);
    }
}
const indice = new IndexRoutes();
exports.default = indice.router;
