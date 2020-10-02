/*CARGA MASIVA A LA TABLA TEMPORAL*/
LOAD DATA LOCAL INFILE '/home/pablo/Documentos/GitHub/MIA_PRACTICA201800464/DataCenterData.csv'
INTO TABLE temporal
character set latin1
FIELDS TERMINATED BY ';'
LINES TERMINATED BY '\r\n'
IGNORE 1 lines
(nombreComp,contactoComp,correoComp,telefonoComp,tipo,nombre,correo,tel,fechaRegistro,direccion,ciudad,codigoPostal,region,producto,categoriaProducto,cantidad,precioUnitario)
SET fechaRegistro=str_to_date(@var1,'%d%m%Y');


/* CARGANDO LA TABLA ER */
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
INSERT INTO codigoPostal (codigoPostal) select distinct codigoPostal from temporal; 
/*CIUDAD*/
INSERT INTO ciudad (nombreCiudad) select distinct temporal.ciudad FROM temporal; 
