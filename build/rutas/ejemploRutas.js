"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); // lo que viene entre llaves si es propio del modulo 
const metodosEjemplo_1 = require("../controllers/metodosEjemplo");
class EjemploRutas {
    constructor() {
        this.router = express_1.Router();
        this.addRutas();
    }
    addRutas() {
        this.router.get('/', metodosEjemplo_1.metodos.getList);
        this.router.post('/', metodosEjemplo_1.metodos.crear);
        this.router.delete('/:id', metodosEjemplo_1.metodos.eliminar);
        this.router.put('/actualizar/:id', metodosEjemplo_1.metodos.actualizar);
        this.router.get('/soloUno/:id', metodosEjemplo_1.metodos.getUno);
    }
}
const ejemplo = new EjemploRutas();
exports.default = ejemplo.router; // lo que enrealidad exporto en un  router 
