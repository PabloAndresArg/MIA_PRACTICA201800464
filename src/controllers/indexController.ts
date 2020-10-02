import {Request ,Response} from 'express'
import db from '../database'; // es el pool 
class IndexController{
  public async Metodoindex  (req : Request,res: Response){ 
    //res.send('hola');
    res.json({text:'la api esta funcionando Y Conectada'});
    db.query('DESCRIBE games;');
  }

  public async MetodocargarTemporal (req :Request , res: Response){
    await db.query(`
    LOAD DATA LOCAL INFILE '/home/pablo/Documentos/GitHub/MIA_PRACTICA201800464/DataCenterData.csv'
    INTO TABLE temporal
    character set latin1
    FIELDS TERMINATED BY ';'
    LINES TERMINATED BY '\r\n'
    IGNORE 1 lines
    (nombreComp,contactoComp,correoComp,telefonoComp,tipo,nombre,correo,tel,fechaRegistro,direccion,cuidad,codigoPostal,region,producto,categoriaProducto,cantidad,precioUnitario)
    SET fechaRegistro=str_to_date(@var1,'%d%m%Y');
    `);
    res.json('carga de la temporal Realizada correctamente')
  }

  public async MetodoEliminarTemporal(req:Request , res:Response){
    await db.query(`TRUNCATE TABLE temporal;`);
    res.json('TABLA TEMPORAL SIN REGISTROS , OK') 
  }


}

export const  indexController = new IndexController();
// usa la misma logica que javascript 
// exporta un  objeto que posee ya los metodos 

// se puede en 2 lineas tambien 
//const  indexController = new IndexController();
//export default indexController;