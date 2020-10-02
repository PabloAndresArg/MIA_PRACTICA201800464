/*CARGA MASIVA A LA TABLA TEMPORAL*/
LOAD DATA LOCAL INFILE '/home/pablo/Documentos/GitHub/MIA_PRACTICA201800464/DataCenterData.csv'
INTO TABLE temporal
character set latin1
FIELDS TERMINATED BY ';'
LINES TERMINATED BY '\r\n'
IGNORE 1 lines
(nombreComp,contactoComp,correoComp,telefonoComp,tipo,nombre,correo,tel,fechaRegistro,direccion,cuidad,codigoPostal,region,producto,categoriaProducto,cantidad,precioUnitario)
SET fechaRegistro=str_to_date(@var1,'%d%m%Y');
