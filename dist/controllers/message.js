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
exports.searchMessages = exports.deleteMessage = exports.putMessage = exports.postMessage = exports.getMessage = exports.getMessages = void 0;
const message_1 = __importDefault(require("../models/message"));
const client_1 = __importDefault(require("../models/client"));
const user_1 = __importDefault(require("../models/user"));
const campaign_1 = __importDefault(require("../models/campaign"));
const sequelize_1 = require("sequelize");
/**
 * Lista los mensajes activos
 * @param { Request } req
 * @param { Response } res
 */
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10 } = req.query;
    const skipValue = parseInt(page) * parseInt(limit) - parseInt(limit);
    const limitValue = parseInt(limit);
    const [total, messages] = yield Promise.all([
        message_1.default.count({
            include: [{
                    model: campaign_1.default,
                    include: [{
                            model: user_1.default,
                            include: [{
                                    model: client_1.default
                                }],
                            required: true
                        }],
                    required: true
                }],
            where: {
                estado: true
            }
        }),
        message_1.default.findAll({
            include: [{
                    model: campaign_1.default,
                    include: [{
                            model: user_1.default,
                            include: [{
                                    model: client_1.default
                                }],
                            required: true
                        }],
                    required: true
                }],
            where: {
                estado: true
            },
            offset: skipValue,
            limit: limitValue
        })
    ]);
    res.json({
        total,
        messages
    });
});
exports.getMessages = getMessages;
/**
 * Lista un mensaje específico a través de su id
 * @param { Request } req
 * @param { Response } res
 */
const getMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const message = yield message_1.default.findByPk(id);
    res.json(message);
});
exports.getMessage = getMessage;
/**
 * Crea un nuevo mensaje relacionado a una campaña
 * @param { Request } req
 * @param { Response }res
 */
const postMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fechaHoraEnvio, mensaje, idCampania } = req.body;
    try {
        const message = message_1.default.build({
            fechaHoraEnvio: new Date(fechaHoraEnvio),
            mensaje: mensaje.trim(),
            idCampania
        });
        const newMessage = yield message_1.default.create(message.get({ plain: true }));
        res.status(201).json(newMessage);
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Contacte al administrador'
        });
    }
});
exports.postMessage = postMessage;
/**
 * Actualiza un mensaje ubicado por su id y relacionado a una campaña
 * @param { Request } req
 * @param { Response } res
 */
const putMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { fechaHoraEnvio, mensaje, estadoEnvio } = req.body;
    try {
        const message = yield message_1.default.findByPk(id);
        if (!message) {
            return res.status(404).json({
                msg: `No existe el mensaje con el id ${id}`
            });
        }
        yield message.update({
            fechaHoraEnvio: new Date(fechaHoraEnvio),
            estadoEnvio,
            mensaje: mensaje.trim()
        });
        res.json(message);
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Contacte al administrador'
        });
    }
});
exports.putMessage = putMessage;
/**
 * Cambia el estado a false de un mensaje ubicado por su id
 * @param { Request} req
 * @param { Response } res
 */
const deleteMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const message = yield message_1.default.findByPk(id);
    if (!message) {
        return res.status(404).json({
            msg: `No existe el mensaje con el id ${id}`
        });
    }
    yield message.update({ estado: false });
    res.json(message);
});
exports.deleteMessage = deleteMessage;
/**
 * Búsquedas personalizadas de mensajes.
 * Se puede buscar por idCliente, estadoEnvio, fechaInicio, fechaFin y texto
 * @param { Request } req
 * @param { Response } res
 */
const searchMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10 } = req.query;
    const { idCliente, estadoEnvio, fechaInicio, fechaFin, texto } = req.body;
    const skipValue = parseInt(page) * parseInt(limit) - parseInt(limit);
    const limitValue = parseInt(limit);
    let filters = {
        estado: true
    };
    let clientFilter = {
        estado: true
    };
    if (estadoEnvio) {
        filters = Object.assign(Object.assign({}, filters), { estadoEnvio });
    }
    if (fechaInicio && fechaFin) {
        filters = Object.assign(Object.assign({}, filters), { fechaHoraEnvio: {
                [sequelize_1.Op.between]: [new Date(fechaInicio), new Date(fechaFin)]
            } });
    }
    if (fechaInicio && !fechaFin) {
        filters = Object.assign(Object.assign({}, filters), { fechaHoraEnvio: {
                [sequelize_1.Op.gte]: new Date(fechaInicio)
            } });
    }
    if (!fechaInicio && fechaFin) {
        filters = Object.assign(Object.assign({}, filters), { fechaHoraEnvio: {
                [sequelize_1.Op.lte]: new Date(fechaFin)
            } });
    }
    if (texto) {
        filters = Object.assign(Object.assign({}, filters), { mensaje: {
                [sequelize_1.Op.like]: `%${texto}%`
            } });
    }
    if (idCliente) {
        clientFilter = Object.assign(Object.assign({}, clientFilter), { idCliente });
    }
    const [total, messages] = yield Promise.all([
        message_1.default.count({
            include: [{
                    model: campaign_1.default,
                    include: [{
                            model: user_1.default,
                            include: [{
                                    model: client_1.default,
                                    where: clientFilter
                                }],
                            required: true
                        }],
                    required: true
                }],
            where: filters
        }),
        message_1.default.findAll({
            include: [{
                    model: campaign_1.default,
                    include: [{
                            model: user_1.default,
                            include: [{
                                    model: client_1.default,
                                    where: clientFilter
                                }],
                            required: true
                        }],
                    required: true
                }],
            where: filters,
            offset: skipValue,
            limit: limitValue
        })
    ]);
    res.json({
        total,
        messages
    });
});
exports.searchMessages = searchMessages;
//# sourceMappingURL=message.js.map