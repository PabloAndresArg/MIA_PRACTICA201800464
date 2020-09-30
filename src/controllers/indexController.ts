import {Request ,Response} from 'express'
import db from '../database'; // es el pool 
class IndexController{
  public async Metodoindex  (req : Request,res: Response){ 
    //res.send('hola');
    res.json({text:'la api esta funcionando Y Conectada'});
    db.query('DESCRIBE games;');
  }
}

export const  indexController = new IndexController();
// usa la misma logica que javascript 
// exporta un  objeto que posee ya los metodos 

// se puede en 2 lineas tambien 
//const  indexController = new IndexController();
//export default indexController;