use p1;
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

/*2. Mostrar el número de cliente, nombre, apellido y total del cliente que más
productos ha comprado.*/
select cliente.idCliente,cliente.nombre, sum(detalleCompra.cantidad)as TOTAL_PRODUCTOS 
FROM cliente , compra , detalleCompra
where cliente.idCliente = compra.idCliente
AND   detalleCompra.idCompra = compra.idCompra
GROUP BY cliente.idCliente ORDER BY TOTAL_PRODUCTOS DESC limit 1;/*DE MAYOR A MENOR*/
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

/*4.Mostrar el número de cliente, nombre, apellido, el número de órdenes que ha
realizado y el total de cada uno de los cinco clientes que más han comprado
productos de la categoría ‘Cheese’.--- PARA CLIENTES */
select count(compra.idCompra) as cantidadCompras  ,  sum(detalleCompra.cantidad*producto.precioUnitario) as precio ,cliente.idCliente , cliente.nombre as NOMBRE_CLIENTE 
from  detalleCompra , cliente , compra, producto , categoria
WHERE detalleCompra.idCliente = cliente.idCliente 
AND   detalleCompra.idCompra = compra.idCompra
AND   producto.idProducto = detalleCompra.idProducto
AND   producto.idCategoria = categoria.idCategoria
AND   categoria.categoria = 'cheese'
GROUP BY cliente.idCliente , cliente.nombre 
ORDER BY precio DESC LIMIT 5;
/*5. 
Mostrar el número de mes de la fecha de registro, nombre y apellido de todos
los clientes que más han comprado y los que menos han comprado (en
dinero) utilizando una sola consulta.
*/



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


