"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexRutas_1 = __importDefault(require("./rutas/indexRutas"));
const morgan_1 = __importDefault(require("morgan"));
//import cors from 'cors'; para comunicacion entre 2 servers 
const ejemploRutas_1 = __importDefault(require("./rutas/ejemploRutas"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.configurar();
        this.setRutas();
    }
    configurar() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev')); // me ayuda a ver las peticiones
        //this.app.use(cors()); para comunicarse entre 2 servidores 
        this.app.use(express_1.default.json()); // para que entienda el formato json
        this.app.use(express_1.default.urlencoded({ extended: false })); //para enviar desde formulario html
    }
    setRutas() {
        this.app.use('/', indexRutas_1.default);
        this.app.use('/ejemplo', ejemploRutas_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => { console.log('Servidor Escuchando en: ', this.app.get('port')); });
    }
}
const servidor = new Server();
servidor.start();
