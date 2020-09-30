import { Router} from 'express'; // lo que viene entre llaves si es propio del modulo 
import {metodos} from '../controllers/metodosEjemplo'
class EjemploRutas{
  public router : Router = Router(); 
  constructor(){
    this.addRutas();
  }
  addRutas():void{
   this.router.get('/' , metodos.getList);
   this.router.post('/' , metodos.crear);
   this.router.delete('/:id', metodos.eliminar);
   this.router.put('/actualizar/:id', metodos.actualizar);
   this.router.get('/soloUno/:id', metodos.getUno);
  }

}
const ejemplo = new EjemploRutas();
export default ejemplo.router;// lo que enrealidad exporto en un  router 