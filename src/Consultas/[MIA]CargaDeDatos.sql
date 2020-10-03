/*CARGA MASIVA A LA TABLA TEMPORAL*/
LOAD DATA LOCAL INFILE '/home/pablo/Documentos/GitHub/MIA_PRACTICA201800464/DataCenterData.csv'
INTO TABLE temporal
character set latin1
FIELDS TERMINATED BY ';'
LINES TERMINATED BY '\r\n'
IGNORE 1 lines
(nombreComp,contactoComp,correoComp,telefonoComp,tipo,nombre,correo,tel,@var1,direccion,ciudad,codigoPostal,region,producto,categoriaProducto,cantidad,precioUnitario)
SET fechaRegistro = str_to_date( @var1 ,'%d/%m/%Y');


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