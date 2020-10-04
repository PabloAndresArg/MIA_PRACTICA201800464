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
        precioUnitario decimal(10,2) not null
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
        precioUnitario decimal(10,2) not null,
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

  public async consulta1(req:Request , res:Response){
    const consultona =   await db.query(`
            /*1. Mostrar el nombre del proveedor, número de teléfono, número de orden,
            total de la orden por la cual se haya pagado la mayor cantidad de dinero.*/
            select proveedor.nombre,proveedor.telefono,orden.idOrden
            ,(
            select sum(detalleOrden.cantidad * producto.precioUnitario) /*sobre un producto especifico*/
            from producto,detalleOrden, orden
            where detalleOrden.idOrden = orden.idOrden
            AND   detalleOrden.idProducto = producto.idProducto
            AND  compania.idCompania = orden.idCompania
            AND  proveedor.idProveedor = orden.idProveedor
            ) as total 
            FROM proveedor , orden  , compania 
            where proveedor.idProveedor = orden.idProveedor
            AND   compania.idCompania = orden.idCompania
            ORDER BY total DESC limit 1;/*DE MAYOR A MENOR*/
    `);
    res.json(consultona);
  }
  public async consulta2(req:Request , res:Response){
    const consultona = await db.query(`
    /*2. Mostrar el número de cliente, nombre, apellido y total del cliente que más
    productos ha comprado.*/
    select cliente.idCliente,cliente.nombre, sum(detalleCompra.cantidad)as TOTAL_PRODUCTOS 
    FROM cliente , compra , detalleCompra
    where cliente.idCliente = compra.idCliente
    AND   detalleCompra.idCompra = compra.idCompra
    GROUP BY cliente.idCliente ORDER BY TOTAL_PRODUCTOS DESC limit 1;/*DE MAYOR A MENOR*/
    `);
    res.json(consultona);
  }
  public async consulta3(req:Request , res:Response){
    const consultona =  await db.query(`
                  /*
              3.Mostrar la dirección, región, ciudad y código postal hacia la cual se han hecho
              más solicitudes de pedidos y a cuál menos (en una sola consulta).
              */
              (
              select count(idOrden) as cantidad_ordenes , direccion.direccion , region.region , ciudad.nombreCiudad , codigoPostal.codigoPostal
              from orden 
              INNER JOIN proveedor on orden.idProveedor = proveedor.idProveedor 
              INNER JOIN direccion on proveedor.idDireccion = direccion.idDireccion
              INNER JOIN region on region.idRegion = direccion.idRegion
              INNER JOIN ciudad on ciudad.idCiudad = direccion.idCiudad
              INNER JOIN codigoPostal on direccion.idCodigoPostal = codigoPostal.idCodigoPostal
              group by direccion.direccion , region.region , ciudad.nombreCiudad , codigoPostal.codigoPostal ORDER BY cantidad_ordenes DESC limit 2
              )/*MAYOR*/
              UNION /* JUNTA DOS SELECT EN ESTE CASO */
              (
              select count(orden.idOrden) as cantidad_ordenes , direccion.direccion , region.region , ciudad.nombreCiudad , codigoPostal.codigoPostal
              from orden 
              INNER JOIN proveedor on orden.idProveedor = proveedor.idProveedor 
              INNER JOIN direccion on proveedor.idDireccion = direccion.idDireccion
              INNER JOIN region on region.idRegion = direccion.idRegion
              INNER JOIN ciudad on ciudad.idCiudad = direccion.idCiudad
              INNER JOIN codigoPostal on direccion.idCodigoPostal = codigoPostal.idCodigoPostal
              group by direccion.direccion , region.region , ciudad.nombreCiudad , codigoPostal.codigoPostal ORDER BY cantidad_ordenes ASC limit 2
              ); /*MENOR*/
    `);
    res.json(consultona);
  }
  public async consulta4(req:Request , res:Response){
    const consultona =  await db.query(`
      /*4.Mostrar el número de cliente, nombre, apellido, el número de órdenes que ha
      realizado y el total de cada uno de los cinco clientes que más han comprado
      productos de la categoría ‘Cheese’.--- PARA CLIENTES */
      select cliente.idCliente , cliente.nombre as NOMBRE_CLIENTE ,count(compra.idCompra) as cantidadCompras  ,  sum(detalleCompra.cantidad*producto.precioUnitario) as Total  
      from  detalleCompra , cliente , compra, producto , categoria
      WHERE detalleCompra.idCliente = cliente.idCliente 
      AND   detalleCompra.idCompra = compra.idCompra
      AND   producto.idProducto = detalleCompra.idProducto
      AND   producto.idCategoria = categoria.idCategoria
      AND   categoria.categoria = 'cheese'
      GROUP BY cliente.idCliente , cliente.nombre 
      ORDER BY cantidadCompras DESC LIMIT 5;
    `);
    res.json(consultona);
  }
  public async consulta5(req:Request , res:Response){
    const consultona =  await db.query(`
    /*5. 
    Mostrar el número de mes de la fecha de registro, nombre y apellido de todos
    los clientes que más han comprado y los que menos han comprado (en
    dinero) utilizando una sola consulta.
    */
    (select extract(month from cliente.fechaRegistro) as MES , cliente.idCliente , cliente.nombre as NOMBRE_CLIENTE,count(compra.idCompra) as cantidadCompras  ,  sum(detalleCompra.cantidad*producto.precioUnitario) as Total  
    from  detalleCompra , cliente , compra, producto , categoria
    WHERE detalleCompra.idCliente = cliente.idCliente 
    AND   detalleCompra.idCompra = compra.idCompra
    AND   producto.idProducto = detalleCompra.idProducto
    AND   producto.idCategoria = categoria.idCategoria
    /*AND   categoria.categoria = 'cheese'*/
    GROUP BY cliente.idCliente , cliente.nombre 
    ORDER BY Total DESC LIMIT 5)
    UNION 
    (select extract(month from cliente.fechaRegistro) as MES , cliente.idCliente , cliente.nombre as NOMBRE_CLIENTE,count(compra.idCompra) as cantidadCompras  ,  sum(detalleCompra.cantidad*producto.precioUnitario) as Total  
    from  detalleCompra , cliente , compra, producto , categoria
    WHERE detalleCompra.idCliente = cliente.idCliente 
    AND   detalleCompra.idCompra = compra.idCompra
    AND   producto.idProducto = detalleCompra.idProducto
    AND   producto.idCategoria = categoria.idCategoria
    /*AND   categoria.categoria = 'cheese'*/
    GROUP BY cliente.idCliente , cliente.nombre 
    ORDER BY Total ASC LIMIT 5);
    `);
    res.json(consultona);
  }
  public async consulta6(req:Request , res:Response){
    const consultona =  await db.query(`
    /*
    6.Mostrar el nombre de la categoría más y menos vendida y el total vendido en
    dinero (en una sola consulta).
  
  */ 
  (select idCate,nomCate,count(idCate) AS VENTAS, SUM(SUB_TOTAL) AS TOTAL
   FROM(/*tabla temporal , de aca saco mis datos :D*/ 
   SELECT categoria.idCategoria AS idCate, categoria.categoria AS nomCate ,
   (detalleCompra.cantidad * producto.precioUnitario) AS SUB_TOTAL
   FROM detalleCompra , compra , cliente , producto , categoria
   WHERE  detalleCompra.idCompra = compra.idCompra -- de detalle compra hacia la compra --->
   AND    compra.idCliente  = cliente.idCliente  -- me interesa el cliente porque el fue el que compro 
   AND    detalleCompra.idProducto = producto.idProducto
   AND    producto.idCategoria = categoria.idCategoria 
  ) AS tablaConsulta 
  GROUP BY idCate ORDER BY TOTAL desc limit 1)/*MAS GRANDE*/
  UNION 
  (select idCate,nomCate,count(idCate) AS VENTAS, SUM(SUB_TOTAL) AS TOTAL
   FROM(/*tabla temporal , de aca saco mis datos :D*/ 
   SELECT categoria.idCategoria AS idCate, categoria.categoria AS nomCate ,
   (detalleCompra.cantidad * producto.precioUnitario) AS SUB_TOTAL
   FROM detalleCompra , compra , cliente , producto , categoria
   WHERE  detalleCompra.idCompra = compra.idCompra -- de detalle compra hacia la compra --->
   AND    compra.idCliente  = cliente.idCliente  -- me interesa el cliente porque el fue el que compro 
   AND    detalleCompra.idProducto = producto.idProducto
   AND    producto.idCategoria = categoria.idCategoria 
  ) AS tablaConsulta 
  GROUP BY idCate ORDER BY TOTAL ASC limit 1);/*MAS PEQUEÑO*/
    `);
    res.json(consultona);
  }
  public async consulta7(req:Request , res:Response){
    const consultona =  await db.query(`
    /*
    7.Mostrar el top 5 de proveedores que más productos han vendido (en dinero)
    de la categoría de productos ‘Fresh Vegetables’.
    */
    /*SUB CONSULTA PRIMERO--*/
    select idProv , nombreProv , tel , sum(ACUMULADO)/*cuatos*/as TOTAL_PRODUCTOS  , sum(subDinero) as TOTAL_DINERO
    FROM(/*tabla surgida de un subQuery*/
      SELECT  proveedor.idProveedor AS idProv , proveedor.nombre AS nombreProv , proveedor.telefono as tel , (detalleOrden.cantidad * producto.precioUnitario) as SubDinero
          , detalleOrden.cantidad as ACUMULADO
      FROM proveedor , orden , detalleOrden , producto , categoria
          where proveedor.idProveedor = orden.idProveedor -- tengo que ir a proveedores porque ellos venden :v 
      AND   detalleOrden.idOrden = orden.idOrden -- ir hacia las ordenes y a los detallesOrdenes
      AND   producto.idProducto = detalleOrden.idProducto -- ir a productos por medio de mi detalle
      AND   producto.idCategoria = categoria.idCategoria -- que case la categoria
      AND   categoria.categoria = 'Fresh Vegetables' -- y ahora restringir que sea solo fresh vegetables 
    )AS consultaSubQuery
    group by idProv , nombreProv , tel
    ORDER BY TOTAL_DINERO DESC limit 5;
    `);
    res.json(consultona);
  }
  public async consulta8(req:Request , res:Response){
    const consultona =  await db.query(`
    /*
    8. Mostrar la dirección, región, ciudad y código postal de los clientes que más
    han comprado y de los que menos (en dinero) en una sola consulta.
    */
    (select cliente.nombre , direccion.direccion, region.region , ciudad.nombreCiudad , codigoPostal.codigoPostal,  sum(detalleCompra.cantidad*producto.precioUnitario) as Total  
    from  detalleCompra , cliente , compra, producto , categoria , direccion , region , ciudad , codigoPostal
    WHERE detalleCompra.idCliente = cliente.idCliente 
    AND   detalleCompra.idCompra = compra.idCompra
    AND   producto.idProducto = detalleCompra.idProducto
    AND   producto.idCategoria = categoria.idCategoria
    AND   direccion.idDireccion = cliente.idDireccion
    AND   direccion.idRegion = region.idRegion
    AND   direccion.idCiudad = ciudad.idCiudad
    AND   direccion.idCodigoPostal = codigoPostal.idCodigoPostal
    GROUP BY cliente.nombre ,direccion.direccion, region.region , ciudad.nombreCiudad , codigoPostal.codigoPostal
    ORDER BY Total DESC LIMIT 5)
    UNION 
    (select cliente.nombre , direccion.direccion, region.region , ciudad.nombreCiudad , codigoPostal.codigoPostal,  sum(detalleCompra.cantidad*producto.precioUnitario) as Total  
    from  detalleCompra , cliente , compra, producto , categoria , direccion , region , ciudad , codigoPostal
    WHERE detalleCompra.idCliente = cliente.idCliente 
    AND   detalleCompra.idCompra = compra.idCompra
    AND   producto.idProducto = detalleCompra.idProducto
    AND   producto.idCategoria = categoria.idCategoria
    AND   direccion.idDireccion = cliente.idDireccion
    AND   direccion.idRegion = region.idRegion
    AND   direccion.idCiudad = ciudad.idCiudad
    AND   direccion.idCodigoPostal = codigoPostal.idCodigoPostal
    GROUP BY cliente.nombre ,direccion.direccion, region.region , ciudad.nombreCiudad , codigoPostal.codigoPostal
    ORDER BY Total ASC LIMIT 5);
    `);
    res.json(consultona);
  }
  public async consulta9(req:Request , res:Response){
    const consultona =  await db.query(`
    /*
    9. Mostrar el nombre del proveedor, número de teléfono, número de orden,
    total de la orden por la cual se haya obtenido la menor cantidad de producto.  se parece a la 1 :v 
    */
    SELECT  proveedor.nombre , proveedor.telefono, orden.idOrden,
    sum(detalleOrden.cantidad) AS CantidadOrdenado ,sum(producto.precioUnitario * detalleOrden.cantidad) AS TotalOrden -- TERMINO DE MOSTRAR LOS CAMPOS QUE QUIERO 
    FROM detalleOrden , producto, orden , proveedor
    where detalleOrden.idProducto = producto.idProducto
    AND  detalleOrden.idOrden = orden.idOrden
    AND  orden.idProveedor = proveedor.idProveedor
    group by proveedor.nombre , proveedor.telefono, orden.idOrden ORDER BY CantidadOrdenado ASC limit 12;
    `);
    res.json(consultona);
  }
  public async consulta10(req:Request , res:Response){
    const consultona =  await db.query(`
    /*
    10. Mostrar el top 10 de los clientes que más productos han comprado de la
    categoría ‘Seafood’.
    */
    select cliente.idCliente, cliente.nombre , cliente.correo , sum(detalleCompra.cantidad) as TOTAL_PRODUCTOS_sadfood
    FROM cliente , compra , detalleCompra , producto , categoria
    where cliente.idCliente = compra.idCliente
    AND   detalleCompra.idCompra = compra.idCompra
    AND   producto.idProducto = detalleCompra.idProducto
    AND   producto.idCategoria = categoria.idCategoria
    AND   categoria.categoria = 'Seafood'
    GROUP BY cliente.idCliente, cliente.nombre , cliente.correo
    ORDER BY TOTAL_PRODUCTOS_sadfood DESC LIMIT 10 ;
    `);
    res.json(consultona);
  }

}

export const  indexController = new IndexController();
// usa la misma logica que javascript 
// exporta un  objeto que posee ya los metodos 

// se puede en 2 lineas tambien 
//const  indexController = new IndexController();
//export default indexController;