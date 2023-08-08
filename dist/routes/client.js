"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const client_1 = require("../controllers/client");
const valid_fields_1 = require("../middlewares/valid-fields");
const db_validators_1 = require("../helpers/db-validators");
const client_2 = __importDefault(require("../models/client"));
const clientsRouter = (0, express_1.Router)();
clientsRouter.get('/', client_1.getClients);
clientsRouter.get('/:id', [
    (0, express_validator_1.check)('id').custom(db_validators_1.existsRecordById.bind(null, client_2.default)),
    valid_fields_1.validFields
], client_1.getClient);
clientsRouter.post('/', [
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('nombre', 'La longitud máxima es de 100 caracteres').isLength({ max: 100 }),
    valid_fields_1.validFields
], client_1.postClient);
clientsRouter.put('/:id', [
    (0, express_validator_1.check)('id').custom(db_validators_1.existsRecordById.bind(null, client_2.default)),
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('nombre', 'La longitud máxima es de 100 caracteres').isLength({ max: 100 }),
    valid_fields_1.validFields
], client_1.putClient);
clientsRouter.delete('/:id', [
    (0, express_validator_1.check)('id').custom(db_validators_1.existsRecordById.bind(null, client_2.default)),
    (0, express_validator_1.check)('id').custom(db_validators_1.hasChildren.bind(null, client_2.default)),
    valid_fields_1.validFields
], client_1.deleteClient);
exports.default = clientsRouter;
//# sourceMappingURL=client.js.map