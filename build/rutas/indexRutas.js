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
    }
}
const indice = new IndexRoutes();
exports.default = indice.router;
