"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metodos = void 0;
const database_1 = __importDefault(require("../database")); // es el pool 
class Metodo {
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            yield database_1.default.query('INSERT INTO games set ?', [req.body]); //                    SI USO AWAIT TENGO QUE DECIR QUE EL METODO ES ASYNC 
            res.json('creando un juego');
            // res.send(objeto); es para una api web 
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('DELETE FROM  games WHERE id = ?', req.params.id); // 
            res.json('funado ');
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    getList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const lista = yield database_1.default.query('select* from games');
            res.json(lista);
        });
    }
    getUno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //  const lista =  await db.query('select* from games where id = ?', req.params.id);
            const { id } = req.params;
            const lista = yield database_1.default.query('select* from games where id = ?', [id]);
            if (lista.length > 0) {
                return res.json(lista[0]);
            }
            res.status(404).json("no se encontro");
        });
    }
}
exports.metodos = new Metodo();
// usa la misma logica que javascript 
// exporta un  objeto que posee ya los metodos 
