"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); // lo que viene entre llaves si es propio del modulo 
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.addRutas();
    }
    addRutas() {
        this.router.get('/', (req, res) => { res.send('hola'); });
    }
}
const indice = new IndexRoutes();
exports.default = indice.router;
