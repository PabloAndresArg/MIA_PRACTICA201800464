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
select cliente.idCliente , cliente.nombre as NOMBRE_CLIENTE ,count(compra.idCompra) as cantidadCompras  ,  sum(detalleCompra.cantidad*producto.precioUnitario) as Total  
from  detalleCompra , cliente , compra, producto , categoria
WHERE detalleCompra.idCliente = cliente.idCliente 
AND   detalleCompra.idCompra = compra.idCompra
AND   producto.idProducto = detalleCompra.idProducto
AND   producto.idCategoria = categoria.idCategoria
AND   categoria.categoria = 'cheese'
GROUP BY cliente.idCliente , cliente.nombre 
ORDER BY cantidadCompras DESC LIMIT 5;
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



/*4. VERSION 2.0   */
select cliente.idCliente , cliente.nombre as NOMBRE_CLIENTE , cliente.telefono , cliente.correo ,count(compra.idCompra) as cantidadCompras  ,  sum(detalleCompra.cantidad) as TotalProductos  
from  detalleCompra , cliente , compra, producto , categoria
WHERE detalleCompra.idCliente = cliente.idCliente 
AND   detalleCompra.idCompra = compra.idCompra
AND   producto.idProducto = detalleCompra.idProducto
AND   producto.idCategoria = categoria.idCategoria
AND   categoria.categoria = 'cheese'
GROUP BY cliente.idCliente , cliente.nombre 
ORDER BY TotalProductos DESC LIMIT 5;