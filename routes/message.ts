import { Router } from "express";
import { deleteMessage, getMessage, getMessages, postMessage, putMessage, searchMessages } from "../controllers/message";
import { check } from "express-validator";
import { dateinTime, existsRecordById, isValidDate, validState } from "../helpers/db-validators";
import Message from "../models/message";
import { validFields } from "../middlewares/valid-fields";
import Campaign from "../models/campaign";

const messageRouter = Router();

messageRouter.get('/', getMessages);
messageRouter.get('/:id', [
    check('id').custom(existsRecordById.bind(null, Message)),
    validFields
], getMessage);
messageRouter.post('/', [
    check('fechaHoraEnvio', 'La fecha y hora de envío son necesarios').not().isEmpty(),
    check('fechaHoraEnvio').custom(isValidDate),
    check('fechaHoraEnvio', 'La fecha y hora del envío debe ser mayor a la fecha y hora actual').custom(dateinTime),
    check('idCampania', 'El id de la campaña es obligatorio').not().isEmpty(),
    check('idCampania').custom(existsRecordById.bind(null, Campaign)),
    check('mensaje', 'El mensaje es obligatorio').not().isEmpty(),
    check('mensaje', 'La longitud máxima es de 160 caracteres').isLength({max: 160}),
    validFields
], postMessage);
messageRouter.put('/:id', [
    check('id').custom(existsRecordById.bind(null, Message)),
    check('estadoEnvio', 'El estado de envío es obligatorio').not().isEmpty(),
    check('estadoEnvio').custom(validState),
    check('fechaHoraEnvio', 'La fecha y hora de envío son necesarios').not().isEmpty(),
    check('fechaHoraEnvio').custom(isValidDate),
    check('fechaHoraEnvio', 'La fecha y hora del envío debe ser mayor a la fecha y hora actual').custom(dateinTime),
    check('mensaje', 'El mensaje es obligatorio').not().isEmpty(),
    check('mensaje', 'La longitud máxima es de 160 caracteres').isLength({max: 160}),
    validFields
], putMessage);
messageRouter.delete('/:id', [
    check('id').custom(existsRecordById.bind(null, Message)),
    validFields
], deleteMessage);
messageRouter.post('/search', searchMessages);

export default messageRouter;