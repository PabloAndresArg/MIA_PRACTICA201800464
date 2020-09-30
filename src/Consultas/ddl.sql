create database p1;
use p1; 
CREATE TABLE games(
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY , 
    tittle varchar(180),
    descripcion varchar(200),
    image varchar(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DESCRIBE games; 