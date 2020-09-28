const exp = require('express')
const app = exp();// app es el servidor  
app.listen(3000 , () => {console.log("SERVIDOR INICIADO EN localhost:3000")});
app.get('/', (solicitud ,respuesta)=>{respuesta.send('hello world')});
app.get('/root', (solicitud ,respuesta)=>{respuesta.send('root')});
app.post('/', (solicitud ,respuesta)=>{respuesta.send('enviaron algo')});