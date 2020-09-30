"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexRutas_1 = __importDefault(require("./rutas/indexRutas"));
const morgan_1 = __importDefault(require("morgan"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.configurar();
        this.setRutas();
    }
    configurar() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
    }
    setRutas() {
        this.app.use(indexRutas_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => { console.log('Servidor Escuchando en: ', this.app.get('port')); });
    }
}
const servidor = new Server();
servidor.start();
