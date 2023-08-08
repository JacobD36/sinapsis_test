"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const message_1 = require("../controllers/message");
const express_validator_1 = require("express-validator");
const db_validators_1 = require("../helpers/db-validators");
const message_2 = __importDefault(require("../models/message"));
const valid_fields_1 = require("../middlewares/valid-fields");
const campaign_1 = __importDefault(require("../models/campaign"));
const messageRouter = (0, express_1.Router)();
messageRouter.get('/', message_1.getMessages);
messageRouter.get('/:id', [
    (0, express_validator_1.check)('id').custom(db_validators_1.existsRecordById.bind(null, message_2.default)),
    valid_fields_1.validFields
], message_1.getMessage);
messageRouter.post('/', [
    (0, express_validator_1.check)('fechaHoraEnvio', 'La fecha y hora de envío son necesarios').not().isEmpty(),
    (0, express_validator_1.check)('fechaHoraEnvio').custom(db_validators_1.isValidDate),
    (0, express_validator_1.check)('fechaHoraEnvio', 'La fecha y hora del envío debe ser mayor a la fecha y hora actual').custom(db_validators_1.dateinTime),
    (0, express_validator_1.check)('idCampania', 'El id de la campaña es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('idCampania').custom(db_validators_1.existsRecordById.bind(null, campaign_1.default)),
    (0, express_validator_1.check)('mensaje', 'El mensaje es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('mensaje', 'La longitud máxima es de 160 caracteres').isLength({ max: 160 }),
    valid_fields_1.validFields
], message_1.postMessage);
messageRouter.put('/:id', [
    (0, express_validator_1.check)('id').custom(db_validators_1.existsRecordById.bind(null, message_2.default)),
    (0, express_validator_1.check)('estadoEnvio', 'El estado de envío es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('estadoEnvio').custom(db_validators_1.validState),
    (0, express_validator_1.check)('fechaHoraEnvio', 'La fecha y hora de envío son necesarios').not().isEmpty(),
    (0, express_validator_1.check)('fechaHoraEnvio').custom(db_validators_1.isValidDate),
    (0, express_validator_1.check)('fechaHoraEnvio', 'La fecha y hora del envío debe ser mayor a la fecha y hora actual').custom(db_validators_1.dateinTime),
    (0, express_validator_1.check)('mensaje', 'El mensaje es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('mensaje', 'La longitud máxima es de 160 caracteres').isLength({ max: 160 }),
    valid_fields_1.validFields
], message_1.putMessage);
messageRouter.delete('/:id', [
    (0, express_validator_1.check)('id').custom(db_validators_1.existsRecordById.bind(null, message_2.default)),
    valid_fields_1.validFields
], message_1.deleteMessage);
messageRouter.post('/search', message_1.searchMessages);
exports.default = messageRouter;
//# sourceMappingURL=message.js.map