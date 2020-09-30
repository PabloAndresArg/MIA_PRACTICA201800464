import {Request ,Response} from 'express'
import db from '../database'; // es el pool 
class IndexController{
  public Metodoindex  (req : Request,res: Response){ 
    //res.send('hola');
    res.json({text:'la api esta funcionando'});
  }
}

export const  indexController = new IndexController();
// usa la misma logica que javascript 
// exporta un  objeto que posee ya los metodos 

// se puede en 2 lineas tambien 
//const  indexController = new IndexController();
//export default indexController;