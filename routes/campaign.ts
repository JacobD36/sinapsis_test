import { Router } from "express";
import { deleteCampaign, getCampaign, getCampaigns, postCampaign, putCampaign } from "../controllers/campaign";
import { dateinTime, existsRecordById, hasChildren, isValidDate } from "../helpers/db-validators";
import Campaign from "../models/campaign";
import { check } from "express-validator";
import { validFields } from "../middlewares/valid-fields";
import User from "../models/user";
import Message from "../models/message";

const campaignRouter = Router();

campaignRouter.get('/', getCampaigns);
campaignRouter.get('/:id', [
    check('id').custom(existsRecordById.bind(null, Campaign)),
    validFields
], getCampaign);
campaignRouter.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre', 'La longitud máxima es de 200 caracteres').isLength({max: 200}),
    check('idUsuario', 'El idUsuario es obligatorio').not().isEmpty(),
    check('idUsuario').custom(existsRecordById.bind(null, User)),
    check('fechaHoraProgramacion', 'La fecha y hora de la programación es obligatoria').not().isEmpty(),
    check('fechaHoraProgramacion').custom(isValidDate),
    check('fechaHoraProgramacion', 'La fecha y hora de la programación debe ser mayor a la fecha y hora actual').custom(dateinTime),
    validFields
], postCampaign);
campaignRouter.put('/:id', [
    check('id').custom(existsRecordById.bind(null, Campaign)),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre', 'La longitud máxima es de 200 caracteres').isLength({max: 200}),
    check('fechaHoraProgramacion', 'La fecha y hora de la programación es obligatoria').not().isEmpty(),
    check('fechaHoraProgramacion').custom(isValidDate),
    check('fechaHoraProgramacion', 'La fecha y hora de la programación debe ser mayor a la fecha y hora actual').custom(dateinTime),
    validFields
], putCampaign);
campaignRouter.delete('/:id', [
    check('id').custom(existsRecordById.bind(null, Campaign)),
    check('id').custom(hasChildren.bind(null, Campaign)),
    validFields
], deleteCampaign);

export default campaignRouter;