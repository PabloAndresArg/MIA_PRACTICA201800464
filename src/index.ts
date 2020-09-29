import ModuloExpress,{Application} from 'express'
import indexRoutes from './rutas/indexRutas';
class Server{
    public app:Application; 
    constructor(){
        this.app = ModuloExpress();
        this.configurar();
        this.setRutas();
    }
    configurar():void{
        this.app.set('port',process.env.PORT || 3000);
    }
    setRutas():void{
        this.app.use(indexRoutes);
    }
    start():void{
        this.app.listen(this.app.get('port'),()=>{console.log('Servidor Escuchando en: ', this.app.get('port'))});
    }
}

const servidor = new Server();
servidor.start(); 