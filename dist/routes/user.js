"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const express_validator_1 = require("express-validator");
const db_validators_1 = require("../helpers/db-validators");
const valid_fields_1 = require("../middlewares/valid-fields");
const user_2 = __importDefault(require("../models/user"));
const client_1 = __importDefault(require("../models/client"));
const usersRouter = (0, express_1.Router)();
usersRouter.get('/', user_1.getUsers);
usersRouter.get('/:id', [
    (0, express_validator_1.check)('id').custom(db_validators_1.existsRecordById.bind(null, user_2.default)),
    valid_fields_1.validFields
], user_1.getUser);
usersRouter.post('/', [
    (0, express_validator_1.check)('usuario', 'El usuario es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('usuario', 'La longitud máxima es de 30 caracteres').isLength({ max: 30 }),
    (0, express_validator_1.check)('idCliente', 'El idCliente es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('idCliente').custom(db_validators_1.existsRecordById.bind(null, client_1.default)),
    valid_fields_1.validFields
], user_1.postUser);
usersRouter.put('/:id', [
    (0, express_validator_1.check)('id').custom(db_validators_1.existsRecordById.bind(null, user_2.default)),
    (0, express_validator_1.check)('usuario', 'El usuario es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('usuario', 'La longitud máxima es de 30 caracteres').isLength({ max: 30 }),
    valid_fields_1.validFields
], user_1.putUser);
usersRouter.delete('/:id', [
    (0, express_validator_1.check)('id').custom(db_validators_1.existsRecordById.bind(null, user_2.default)),
    (0, express_validator_1.check)('id').custom(db_validators_1.hasChildren.bind(null, user_2.default)),
    valid_fields_1.validFields
], user_1.deleteUser);
exports.default = usersRouter;
//# sourceMappingURL=user.js.map