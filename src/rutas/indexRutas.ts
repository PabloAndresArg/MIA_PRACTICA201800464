import { Router} from 'express'; // lo que viene entre llaves si es propio del modulo 
import {indexController} from '../controllers/indexController'


class IndexRoutes{
  public router : Router = Router(); 
  
  constructor(){
    this.addRutas();
  }
  addRutas():void{
   // this.router.get('/',(req,res)=>{res.send('hola');});
   this.router.get('/' , indexController.Metodoindex);
   this.router.get('/cargarTemporal',indexController.MetodocargarTemporal);
   this.router.get('/eliminarTemporal',indexController.MetodoEliminarTemporal);
  }

}

const indice = new IndexRoutes();
export default indice.router;