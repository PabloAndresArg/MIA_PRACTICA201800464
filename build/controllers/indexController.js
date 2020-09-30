"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
class IndexController {
    Metodoindex(req, res) {
        //res.send('hola');
        res.json({ text: 'la api esta funcionando' });
    }
}
exports.indexController = new IndexController();
// usa la misma logica que javascript 
// exporta un  objeto que posee ya los metodos 
// se puede en 2 lineas tambien 
//const  indexController = new IndexController();
//export default indexController;
