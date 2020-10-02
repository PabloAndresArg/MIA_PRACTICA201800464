/*CREACION DE LA TABLA TEMPORAL*/
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
    cuidad varchar(60) not null,
    codigoPostal int not null,
    region varchar(60) not null,
    producto varchar(60) not null,
    categoriaProducto varchar(60) not null,
    cantidad int not null,
    precioUnitario decimal(4) not null
);
/* CREACION DE MODELO RELACIONAL */
/* QUERIES PARA MI MODELO  */

use p1; 

/*				NO DEPENDIENTES 			*/
CREATE TABLE IF NOT EXISTS compania(
	idCompania INT not null auto_increment, 
    nombre varchar(60) not null, 
    contacto varchar(60)not null,
    correo varchar(60)not null ,
	PRIMARY KEY (idCompania)
);

CREATE TABLE IF NOT exists ciudad(
	idCiudad INT NOT NULL auto_increment,
    nombreCiudad varchar(60) not null, 
    codigoPostal INT NOT NULL,
    PRIMARY KEY (idCiudad)
);

CREATE TABLE IF NOT exists region (
	idRegion INT NOT NULL auto_increment,
    region varchar(60) NOT NULL, 
    PRIMARY KEY (idRegion)
);

/*		TABLAS DEPENDIENTES O CON LLAVES FORANEAS	*/

CREATE TABLE IF NOT EXISTS cliente(
	idCliente INT NOT NULL AUTO_INCREMENT , 
    nombre varchar(60) NOT NULL , 
    correo varchar(60) NOT NULL , 
    telefono varchar(15) not null,
    fechaRegistro DATE not null, 
    idCiudad  INT NOT NULL , 
    idRegion INT NOT NULL ,
    direccion varchar(60) not null , 
    primary key(idCliente , idCiudad , idRegion), 
    foreign key (idRegion) REFERENCES region (idRegion) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
	foreign key (idCiudad) REFERENCES ciudad(idCiudad)
	ON DELETE CASCADE 
    ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS producto(
	idProducto INT NOT NULL AUTO_INCREMENT, 
	precioUnitario DECIMAL(4) NOT NULL ,
    categoria VARCHAR(60) NOT NULL,
    primary key (idProducto)
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
	idDetalleCompra INT NOT NULL, 
    idCompra INT NOT NULL,
    idCliente INT NOT NULL,
    idCompania INT NOT NULL,
    idProducto INT NOT NULL,
    cantidad INT NOT NULL, 
    subtotal decimal(4) NOT NULL, 
    PRIMARY KEY (idDetalleCompra , idCompra , idCliente , idCompania),
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
    idCiudad  INT NOT NULL , 
    idRegion INT NOT NULL ,
    direccion varchar(60) not null , 
    primary key(idProveedor , idCiudad , idRegion), 
    foreign key (idRegion) REFERENCES region (idRegion) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
    foreign key (idCiudad) REFERENCES ciudad(idCiudad)
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
	idDetalleOrden INT NOT NULL, 
    idOrden INT NOT NULL,
    idProveedor INT NOT NULL,
    idCompania INT NOT NULL,
    idProducto INT NOT NULL,
    cantidad INT NOT NULL, 
    subtotal decimal(4) NOT NULL, 
    PRIMARY KEY (idDetalleOrden , idOrden , idProveedor , idCompania),
    FOREIGN KEY (idOrden , idProveedor , idCompania) references orden(idOrden , idProveedor , idCompania)
    ON DELETE CASCADE 
	ON UPDATE CASCADE,
    FOREIGN KEY (idProducto) REFERENCES producto(idProducto)
    ON DELETE CASCADE 
	ON UPDATE CASCADE
);











/*ELIMINAR TODOS LOS DATOS DE LA TABLA TEMPORAL*/
TRUNCATE TABLE temporal;


/* DELETE DE TODAS MI TABLAS :v */


