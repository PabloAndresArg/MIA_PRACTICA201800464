const http = require('http');// para hacer peticiones http 
http.createServer(function (req , res){// funcion de parametro 
    res.write('<h1>hola mundo nodejs</h1>');
    res.end(); 
}).listen(3000);
// node usa el sistema operativo