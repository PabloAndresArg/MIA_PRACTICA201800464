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
   this.router.get('/crearTemporal',indexController.crearTemporal);
   this.router.get('/cargarModelo',indexController.crearYcargarModelo);
   this.router.get('/eliminarModelo' , indexController.eliminarModelo);
   this.router.get('/consulta1' , indexController.consulta1);
   this.router.get('/consulta2' , indexController.consulta2);
   this.router.get('/consulta3' , indexController.consulta3);
   this.router.get('/consulta4' , indexController.consulta4);
   this.router.get('/consulta5' , indexController.consulta5);
   this.router.get('/consulta6' , indexController.consulta6);
   this.router.get('/consulta7' , indexController.consulta7);
   this.router.get('/consulta8' , indexController.consulta8);
   this.router.get('/consulta9' , indexController.consulta9);
   this.router.get('/consulta10' , indexController.consulta10);
  }

}

const indice = new IndexRoutes();
export default indice.router;