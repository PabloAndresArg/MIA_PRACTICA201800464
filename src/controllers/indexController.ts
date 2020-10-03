import {Request ,Response} from 'express'
import db from '../database'; // es el pool 
class IndexController{
  public async Metodoindex  (req : Request,res: Response){ 
    res.json({text:'la api esta funcionando Y Conectada' , ruta1:'http://localhost:3000/crearTemporal'});
  }
  public async eliminarModelo(req :Request , res: Response){
    await db.query(`
    SET FOREIGN_KEY_CHECKS=0;
    drop table detalleCompra; 
    drop table detalleOrden;
    drop table proveedor ;
    drop table cliente;
    drop table direccion;
    drop table producto; 
    drop table categoria; 
    drop table region; 
    drop table compania;
    drop table codigoPostal;
    drop table ciudad;
    drop table compra;
    drop table orden;
    SET FOREIGN_KEY_CHECKS=1;
    `);
    res.json('MODELO ELIMINADO')
  }

  public async MetodocargarTemporal (req :Request , res: Response){
    await db.query(`
    /*CARGA MASIVA A LA TABLA TEMPORAL*/
    LOAD DATA LOCAL INFILE '/home/pablo/Documentos/GitHub/MIA_PRACTICA201800464/DataCenterData.csv'
    INTO TABLE temporal
    character set latin1
    FIELDS TERMINATED BY ';'
    LINES TERMINATED BY '\r\n'
    IGNORE 1 lines
    (nombreComp,contactoComp,correoComp,telefonoComp,tipo,nombre,correo,tel,@var1,direccion,ciudad,codigoPostal,region,producto,categoriaProducto,cantidad,precioUnitario)
    SET fechaRegistro = str_to_date( @var1 ,'%d/%m/%Y');
    `);
    res.json('carga de la temporal Realizada correctamente')
  }

  public async MetodoEliminarTemporal(req:Request , res:Response){
    await db.query(`TRUNCATE TABLE temporal;`);
    res.json('TABLA TEMPORAL SIN REGISTROS , OK');
  }
  public async crearTemporal(req:Request , res:Response){
    await db.query(`
        CREATE TABLE temporal (
        nombreComp varchar(60) not null,
        contactoComp varchar(60) not null,
        correoComp varchar(60) not null,
        telefonoComp varchar(15) not null,
        tipo char(1) not null,
        nombre varchar(60) not null,
        correo varchar(60) not null,
        tel	   varchar(15) not null,
        fechaRegistro date not null, 
        direccion varchar (60) not null, 
        ciudad varchar(60) not null,
        codigoPostal int not null,
        region varchar(60) not null,
        producto varchar(60) not null,
        categoriaProducto varchar(60) not null,
        cantidad int not null,
        precioUnitario decimal(4) not null
        );
        `);
        res.json('CREANDO TABLA TEMPORAL , OK'); 
        }

        public async crearYcargarModelo(req:Request , res:Response){
        await db.query(`
        /* QUERYES PARA MI BASE DE DATOS */
        use p1;
        /*				NO DEPENDIENTES 			*/
        CREATE TABLE IF NOT EXISTS compania(
        idCompania INT not null auto_increment, 
        nombre varchar(60) not null, 
        contacto varchar(60) not null,
        correo varchar(60) not null ,
        telefono varchar(60) not null, 
        PRIMARY KEY (idCompania)
        );

        CREATE TABLE IF NOT exists ciudad(
        idCiudad INT NOT NULL auto_increment,
        nombreCiudad varchar(60) not null, 
        PRIMARY KEY (idCiudad)
        );

        CREATE TABLE IF NOT exists region (
        idRegion INT NOT NULL auto_increment,
        region varchar(60) not NULL, 
        PRIMARY KEY (idRegion)
        );
        CREATE TABLE IF NOT EXISTS codigoPostal(
        idCodigoPostal INT NOT NULL AUTO_INCREMENT,
        codigoPostal INT  not null,
        PRIMARY KEY (idCodigoPostal)
        );

        /*		TABLAS DEPENDIENTES O CON LLAVES FORANEAS	*/
        CREATE TABLE IF NOT EXISTS direccion (
        idDireccion INT NOT NULL auto_increment, 
        direccion varchar(60) not null,
        idCodigoPostal Int not null,
        idCiudad int not null, 
        idRegion int not null,
        PRIMARY KEY (idDireccion),
        foreign key (idCodigoPostal) REFERENCES codigoPostal (idCodigoPostal) ,
        foreign key (idCiudad) REFERENCES ciudad (idCiudad) ,
        foreign key (idRegion) REFERENCES region (idRegion) 
        ); 	
        create table IF NOT EXISTS categoria (
        idCategoria int not null auto_increment, 
        categoria varchar(60) not  null,
        PRIMARY KEY (idCategoria)
        );


        CREATE TABLE IF NOT EXISTS cliente(
        idCliente INT NOT NULL AUTO_INCREMENT , 
        nombre varchar(60)  not NULL , 
        correo varchar(60)  not NULL , 
        telefono varchar(15) not null,
        fechaRegistro DATE not null, 
        idDireccion INT NOT NULL , 
        primary key(idCliente), 
        foreign key (idDireccion) REFERENCES direccion(idDireccion)
        ON DELETE CASCADE 
        ON UPDATE CASCADE
        );

        CREATE TABLE IF NOT EXISTS producto(
        idProducto INT NOT NULL AUTO_INCREMENT, 
        precioUnitario DECIMAL(4) NOT NULL ,
        idCategoria int not null,
        nombre varchar(60) not null, 
        primary key (idProducto),
        foreign key (idCategoria) REFERENCES categoria(idCategoria)
        ON DELETE CASCADE 
        ON UPDATE CASCADE

        );



        CREATE TABLE IF NOT exists compra(
        idCompra INT NOT NULL auto_increment, 
        idCliente INT NOT NULL, 
        idCompania INT NOT NULL, 
        PRIMARY KEY (idCompra , idCliente , idCompania), 
        foreign KEY (idCliente) references cliente(idCliente)
        ON DELETE CASCADE 
        ON UPDATE CASCADE , 
        foreign key (idCompania) references compania(idCompania)
        ON DELETE CASCADE 
        ON UPDATE CASCADE
        );


        CREATE TABLE IF NOT EXISTS detalleCompra(
        idDetalleCompra INT NOT NULL auto_increment, 
        idCompra INT NOT NULL,
        idCliente INT NOT NULL,
        idCompania INT NOT NULL,
        idProducto INT NOT NULL,
        cantidad INT NOT NULL, 
        PRIMARY KEY (idDetalleCompra),
        FOREIGN KEY (idCompra , idCliente , idCompania) references compra(idCompra , idCliente , idCompania)
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
        FOREIGN KEY (idProducto) REFERENCES producto(idProducto)
        ON DELETE CASCADE 
        ON UPDATE CASCADE
        );



        CREATE TABLE IF NOT EXISTS proveedor(
        idProveedor INT NOT NULL AUTO_INCREMENT , 
        nombre varchar(60) NOT NULL , 
        correo varchar(60) NOT NULL , 
        telefono varchar(15) not null,
        fechaRegistro DATE not null, 
        idDireccion INT NOT NULL , 
        primary key(idProveedor), 
        foreign key (idDireccion) REFERENCES direccion(idDireccion)
        ON DELETE CASCADE 
        ON UPDATE CASCADE
        );


        CREATE TABLE IF NOT exists orden(
        idOrden INT NOT NULL auto_increment, 
        idProveedor INT NOT NULL, 
        idCompania INT NOT NULL, 
        PRIMARY KEY (idOrden , idProveedor , idCompania), 
        foreign KEY (idProveedor) references proveedor(idProveedor)
        ON DELETE CASCADE 
        ON UPDATE CASCADE , 
        foreign key (idCompania) references compania(idCompania)
        ON DELETE CASCADE 
        ON UPDATE CASCADE
        );

        CREATE TABLE IF NOT EXISTS detalleOrden(
        idDetalleOrden INT NOT NULL auto_increment, 
        idProducto INT NOT NULL,
        idOrden INT NOT NULL,
        idProveedor INT NOT NULL,
        idCompania INT NOT NULL,
        cantidad INT NOT NULL, 
        PRIMARY KEY (idDetalleOrden),
        FOREIGN KEY (idOrden , idProveedor , idCompania) references orden(idOrden , idProveedor , idCompania)
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
        FOREIGN KEY (idProducto) REFERENCES producto(idProducto)
        ON DELETE CASCADE 
        ON UPDATE CASCADE
        );

    /* CARGANDO LA TABLA ER */
    use p1; 
    /* CARGANDO LA TABLA ORIGEN */
    INSERT INTO region (region) select distinct region from temporal;
    /* CARGANDO LA TABLA CATEGORIAS */
    INSERT INTO categoria (categoria) select distinct categoriaProducto from temporal;
    /*PRODUCTO*/
    INSERT INTO producto (precioUnitario ,nombre,idCategoria ) 
    SELECT distinct  precioUnitario , temporal.producto ,categoria.idCategoria 
    FROM temporal , categoria
    where categoria.categoria = temporal.categoriaProducto;
    /*COMPANIA*/
    INSERT INTO compania (nombre , contacto , correo , telefono ) select distinct temporal.nombreComp , temporal.contactoComp , temporal.correoComp , temporal.telefonoComp
    FROM temporal;
    /*POSTAL*/
    INSERT INTO codigoPostal (codigoPostal) 
    select distinct temporal.codigoPostal from temporal; 
    /*CIUDAD*/
    INSERT INTO ciudad (nombreCiudad) select distinct temporal.ciudad FROM temporal; 
    /*INSERTANDO EN DIRECCIONES*/
    INSERT INTO direccion (direccion , idCodigoPostal  , idCiudad , idRegion)
    SELECT  distinct
    temporal.direccion , codigoPostal.idCodigoPostal , ciudad.idCiudad , region.idRegion
    FROM temporal, codigoPostal,ciudad, region
    WHERE temporal.codigoPostal = codigoPostal.codigoPostal 
    AND temporal.ciudad = ciudad.nombreCiudad
    AND temporal.region = region.region; 
    /*INSERTANDO UN CLIENTE*/
    INsert into cliente 
    (nombre , correo , telefono , fechaRegistro , idDireccion)
    SELECT distinct
    temporal.nombre , temporal.correo
    ,temporal.tel , temporal.fechaRegistro
    ,direccion.idDireccion
    FROM direccion , temporal
    WHERE temporal.tipo = 'C' 
    AND direccion.direccion = temporal.direccion;
    /*INSERTANDO UN Proveedor*/
    INsert into proveedor 
    (nombre , correo , telefono , fechaRegistro , idDireccion)
    SELECT distinct
    temporal.nombre , temporal.correo
    ,temporal.tel , temporal.fechaRegistro
    ,direccion.idDireccion
    FROM direccion , temporal
    WHERE temporal.tipo = 'P' 
    AND direccion.direccion = temporal.direccion;
    /* INSERTANDO ORDENES */
    INSERT into orden (idProveedor , idCompania)
    select distinct proveedor.idProveedor , compania.idCompania
    FROM temporal , compania , proveedor
    where proveedor.nombre = temporal.nombre /*lleva la temporal porque la uso en las condiciones*/
    and compania.nombre = temporal.nombreComp; 
    /* INSERTANDO COMPRAS */
    INSERT into compra (idCliente , idCompania)
    select distinct cliente.idCliente , compania.idCompania
    FROM temporal , compania , cliente/*lleva la temporal porque la uso en las condiciones*/
    where cliente.nombre  = temporal.nombre 
    and compania.nombre = temporal.nombreComp;
    /* DETALLE DE ORDEN , nOrden , idProv , idCompania */
    INSERT INTO detalleOrden(idProducto , idOrden,idProveedor , idCompania,cantidad)
    SELECT  producto.idProducto , orden.idOrden , proveedor.idProveedor , compania.idCompania , temporal.cantidad
    FROM producto , orden , proveedor , compania , temporal
    WHERE producto.nombre = temporal.producto
    AND temporal.tipo = 'P'
    AND temporal.nombreComp = compania.nombre
    AND  temporal.nombre = proveedor.nombre
    AND orden.idProveedor = proveedor.idProveedor
    AND orden.idCompania = compania.idCompania;
    /*DETALLE DE COMPRAS*/
    INSERT INTO detalleCompra(idCompra, idCliente , idCompania , idProducto , cantidad)
    SELECT compra.idCompra , cliente.idCliente , compania.idCompania , producto.idProducto , temporal.cantidad
    FROM compra , cliente , compania , producto , temporal
    WHERE temporal.tipo = 'C'
    AND producto.nombre = temporal.producto
    AND temporal.nombre = cliente.nombre
    AND temporal.nombreComp = compania.nombre 
    AND compra.idCliente = cliente.idCliente
    AND compra.idCompania = compania.idCompania; 
    `);
    res.json('TABLAS CREADAS Y CARGADAS, OK');
  }

}

export const  indexController = new IndexController();
// usa la misma logica que javascript 
// exporta un  objeto que posee ya los metodos 

// se puede en 2 lineas tambien 
//const  indexController = new IndexController();
//export default indexController;