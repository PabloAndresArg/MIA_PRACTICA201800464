import {Request ,Response} from 'express'
import db from '../database'; // es el pool 
class Metodo{
  public async crear(req: Request , res : Response){
    console.log(req.body);
    await db.query('INSERT INTO games set ?',[req.body]); //                    SI USO AWAIT TENGO QUE DECIR QUE EL METODO ES ASYNC 
    res.json('creando un juego')
    // res.send(objeto); es para una api web 
  }
  public async eliminar( req:Request , res: Response ){
    await db.query('DELETE FROM  games WHERE id = ?',req.params.id); // 
    res.json('funado')
  }
  public async actualizar(req:Request , res: Response){

  
  }

  public async getList (req:Request , res: Response){
  const lista =  await db.query('select* from games');
  res.json(lista); 
 }

  public async getUno(req:Request , res: Response){
  //  const lista =  await db.query('select* from games where id = ?', req.params.id);
  const {id} = req.params;
  const lista =  await db.query('select* from games where id = ?',[id]);
  if (lista.length > 0){
   return res.json(lista[0]); 
  }
  res.status(404).json("no se encontro"); 
  }


}

export const  metodos = new Metodo();
// usa la misma logica que javascript 
// exporta un  objeto que posee ya los metodos 
