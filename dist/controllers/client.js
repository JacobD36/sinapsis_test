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
exports.deleteClient = exports.putClient = exports.postClient = exports.getClient = exports.getClients = void 0;
const client_1 = __importDefault(require("../models/client"));
/**
 * Lista los clientes activos
 * @param { Request } req
 * @param { Response } res
 */
const getClients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10 } = req.query;
    const skipValue = parseInt(page) * parseInt(limit) - parseInt(limit);
    const limitValue = parseInt(limit);
    const [total, clients] = yield Promise.all([
        client_1.default.count({
            where: {
                estado: true
            }
        }),
        client_1.default.findAll({
            where: {
                estado: true
            },
            offset: skipValue,
            limit: limitValue
        })
    ]);
    res.json({
        total,
        clients
    });
});
exports.getClients = getClients;
/**
 * Lista un cliente ubicado por su id
 * @param { Request }req
 * @param { Response } res
 */
const getClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const client = yield client_1.default.findByPk(id);
    res.json(client);
});
exports.getClient = getClient;
/**
 * Crea un nuevo cliente
 * @param { Request } req
 * @param { Response } res
 */
const postClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.body;
    try {
        const client = client_1.default.build({ nombre: nombre.trim().toUpperCase() });
        const newClient = yield client_1.default.create(client.get({ plain: true }));
        res.status(201).json(newClient);
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Contacte al administrador'
        });
    }
});
exports.postClient = postClient;
/**
 * Actualiza un cliente ubicado por su id
 * @param { Request } req
 * @param { Response }res
 */
const putClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        const client = yield client_1.default.findByPk(id);
        if (!client) {
            return res.status(404).json({
                msg: `No existe un cliente con el id ${id}`
            });
        }
        yield client.update({ nombre: nombre.trim().toUpperCase() });
        res.json(client);
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Contacte al administrador'
        });
    }
});
exports.putClient = putClient;
/**
 * Cambia el estado de un cliente a false
 * @param { Request } req
 * @param { Response }res
 */
const deleteClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const client = yield client_1.default.findByPk(id);
    if (!client) {
        return res.status(404).json({
            msg: `No existe un cliente con el id ${id}`
        });
    }
    yield client.update({ estado: false });
    res.json(client);
});
exports.deleteClient = deleteClient;
//# sourceMappingURL=client.js.map