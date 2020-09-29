import { Router} from 'express'; // lo que viene entre llaves si es propio del modulo 

class IndexRoutes{
  public router : Router = Router(); 
  
  constructor(){
    this.addRutas();
  }
  addRutas():void{
    this.router.get('/',(req,res)=>{res.send('hola');});
  }

}

const indice = new IndexRoutes();
export default indice.router;