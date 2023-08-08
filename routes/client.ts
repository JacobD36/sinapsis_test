import { Router } from "express";
import { check } from 'express-validator';
import { deleteClient, getClient, getClients, postClient, putClient } from "../controllers/client";
import { validFields } from "../middlewares/valid-fields";
import { existsRecordById, hasChildren } from "../helpers/db-validators";
import Client from "../models/client";

const clientsRouter = Router();

clientsRouter.get('/', getClients);
clientsRouter.get('/:id', [
    check('id').custom(existsRecordById.bind(null, Client)),
    validFields
], getClient);
clientsRouter.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre', 'La longitud máxima es de 100 caracteres').isLength({max: 100}),
    validFields
], postClient);
clientsRouter.put('/:id', [
    check('id').custom(existsRecordById.bind(null, Client)),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre', 'La longitud máxima es de 100 caracteres').isLength({max: 100}),
    validFields
], putClient);
clientsRouter.delete('/:id', [
    check('id').custom(existsRecordById.bind(null, Client)),
    check('id').custom(hasChildren.bind(null, Client)),
    validFields
], deleteClient);

export default clientsRouter;