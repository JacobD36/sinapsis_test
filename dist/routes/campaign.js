"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const campaign_1 = require("../controllers/campaign");
const db_validators_1 = require("../helpers/db-validators");
const campaign_2 = __importDefault(require("../models/campaign"));
const express_validator_1 = require("express-validator");
const valid_fields_1 = require("../middlewares/valid-fields");
const user_1 = __importDefault(require("../models/user"));
const campaignRouter = (0, express_1.Router)();
campaignRouter.get('/', campaign_1.getCampaigns);
campaignRouter.get('/:id', [
    (0, express_validator_1.check)('id').custom(db_validators_1.existsRecordById.bind(null, campaign_2.default)),
    valid_fields_1.validFields
], campaign_1.getCampaign);
campaignRouter.post('/', [
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('nombre', 'La longitud máxima es de 200 caracteres').isLength({ max: 200 }),
    (0, express_validator_1.check)('idUsuario', 'El idUsuario es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('idUsuario').custom(db_validators_1.existsRecordById.bind(null, user_1.default)),
    (0, express_validator_1.check)('fechaHoraProgramacion', 'La fecha y hora de la programación es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('fechaHoraProgramacion').custom(db_validators_1.isValidDate),
    (0, express_validator_1.check)('fechaHoraProgramacion', 'La fecha y hora de la programación debe ser mayor a la fecha y hora actual').custom(db_validators_1.dateinTime),
    valid_fields_1.validFields
], campaign_1.postCampaign);
campaignRouter.put('/:id', [
    (0, express_validator_1.check)('id').custom(db_validators_1.existsRecordById.bind(null, campaign_2.default)),
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('nombre', 'La longitud máxima es de 200 caracteres').isLength({ max: 200 }),
    (0, express_validator_1.check)('fechaHoraProgramacion', 'La fecha y hora de la programación es obligatoria').not().isEmpty(),
    (0, express_validator_1.check)('fechaHoraProgramacion').custom(db_validators_1.isValidDate),
    (0, express_validator_1.check)('fechaHoraProgramacion', 'La fecha y hora de la programación debe ser mayor a la fecha y hora actual').custom(db_validators_1.dateinTime),
    valid_fields_1.validFields
], campaign_1.putCampaign);
campaignRouter.delete('/:id', [
    (0, express_validator_1.check)('id').custom(db_validators_1.existsRecordById.bind(null, campaign_2.default)),
    (0, express_validator_1.check)('id').custom(db_validators_1.hasChildren.bind(null, campaign_2.default)),
    valid_fields_1.validFields
], campaign_1.deleteCampaign);
exports.default = campaignRouter;
//# sourceMappingURL=campaign.js.map