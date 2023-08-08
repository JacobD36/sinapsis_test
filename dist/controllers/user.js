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
exports.deleteUser = exports.putUser = exports.postUser = exports.getUser = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const client_1 = __importDefault(require("../models/client"));
/**
 * Lista los usuarios activos
 * @param { Request }req
 * @param { Response } res
 */
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10 } = req.query;
    const skipValue = parseInt(page) * parseInt(limit) - parseInt(limit);
    const limitValue = parseInt(limit);
    const [total, users] = yield Promise.all([
        user_1.default.count({
            include: [{
                    model: client_1.default
                }],
            where: {
                estado: true
            }
        }),
        user_1.default.findAll({
            include: [{
                    model: client_1.default
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
        users
    });
});
exports.getUsers = getUsers;
/**
 * Lista un usuario ubicado por su id
 * @param { Request } req
 * @param { Response } res
 */
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_1.default.findByPk(id);
    res.json(user);
});
exports.getUser = getUser;
/**
 * Crea un nuevo usuario relacionado a un cliente
 * @param { Request } req
 * @param { Response } res
 */
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario, idCliente } = req.body;
    try {
        const user = user_1.default.build({ usuario: usuario.trim().toUpperCase(), idCliente });
        const newUser = yield user_1.default.create(user.get({ plain: true }));
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Contacte al administrador'
        });
    }
});
exports.postUser = postUser;
/**
 * Actualiza un usuario ubicado por su id y relacionado a un cliente
 * @param { Request } req
 * @param { Response } res
 */
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { usuario } = req.body;
    try {
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            return res.status(404).json({
                msg: `No existe un usuario con el id ${id}`
            });
        }
        yield user.update({ usuario: usuario.trim().toUpperCase() });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Contacte al administrador'
        });
    }
});
exports.putUser = putUser;
/**
 * Cambia el estado a false de un usuario ubicado por su id
 * @param { Request } req
 * @param { Response } res
 */
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            return res.status(404).json({
                msg: `No existe un usuario con el id ${id}`
            });
        }
        yield user.update({ estado: false });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Contacte al administrador'
        });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.js.map