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
    PRIMARY KEY (idDireccion),
	foreign key (idCodigoPostal) REFERENCES codigoPostal (idCodigoPostal) 
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
    fechaRegistro DATE  null, 
    idCiudad  INT NOT NULL , 
    idRegion INT NOT NULL ,
    idDireccion INT NOT NULL , 
    primary key(idCliente), 
    foreign key (idRegion) REFERENCES region (idRegion) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
	foreign key (idCiudad) REFERENCES ciudad(idCiudad)
	ON DELETE CASCADE 
    ON UPDATE CASCADE,
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
	idDetalleCompra INT NOT NULL, 
    idCompra INT NOT NULL,
    idCliente INT NOT NULL,
    idCompania INT NOT NULL,
    idProducto INT NOT NULL,
    cantidad INT NOT NULL, 
    subtotal decimal(4) NOT NULL, 
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
    idCiudad  INT NOT NULL , 
    idRegion INT NOT NULL ,
	idDireccion INT NOT NULL , 
    primary key(idProveedor), 
    foreign key (idRegion) REFERENCES region (idRegion) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
    foreign key (idCiudad) REFERENCES ciudad(idCiudad)
	ON DELETE CASCADE 
    ON UPDATE CASCADE,
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
	idDetalleOrden INT NOT NULL, 
	idProducto INT NOT NULL,
    idOrden INT NOT NULL,
    idProveedor INT NOT NULL,
    idCompania INT NOT NULL,
    cantidad INT NOT NULL, 
    subtotal decimal(4) NOT NULL, 
    PRIMARY KEY (idDetalleOrden),
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


