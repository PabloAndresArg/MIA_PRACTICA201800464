import ModuloExpress,{Application} from 'express'
import indexRoutes from './rutas/indexRutas';
import morgan from 'morgan';
import cors from 'cors';
class Server{
    public app:Application; 
    constructor(){
        this.app = ModuloExpress();
        this.configurar();
        this.setRutas();
    }
    configurar():void{
        this.app.set('port',process.env.PORT || 3000);
        this.app.use(morgan('dev'));// me ayuda a ver las peticiones
        //this.app.use(cors()); para comunicarse entre 2 servidores 
        this.app.use(ModuloExpress.json());// para que entienda el formato json
        this.app.use(ModuloExpress.urlencoded({extended:false}));//para enviar desde formulario html
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