import ModuloExpress,{Application} from 'express'
import indexRoutes from './rutas/indexRutas';
import morgan from 'morgan';
//import cors from 'cors'; para comunicacion entre 2 servers 
import ejemploRutas from './rutas/ejemploRutas'

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
    setRutas():void{// establece las rutas que puede usar nuestro servidor
        this.app.use('/' ,indexRoutes);
        this.app.use('/ejemplo',ejemploRutas);
    }
    start():void{
        this.app.listen(this.app.get('port'),()=>{console.log('Servidor Escuchando en: ', this.app.get('port'))});
    }
}

const servidor = new Server();
servidor.start(); 