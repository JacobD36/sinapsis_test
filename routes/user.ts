import { Router } from "express";
import { getUsers, getUser, postUser, putUser, deleteUser } from "../controllers/user";
import { check } from 'express-validator';
import { existsRecordById, hasChildren } from "../helpers/db-validators";
import { validFields } from "../middlewares/valid-fields";
import User from "../models/user";
import Client from "../models/client";

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:id', [
    check('id').custom(existsRecordById.bind(null, User)),
    validFields
], getUser);
usersRouter.post('/', [
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    check('usuario', 'La longitud máxima es de 30 caracteres').isLength({max: 30}),
    check('idCliente', 'El idCliente es obligatorio').not().isEmpty(),
    check('idCliente').custom(existsRecordById.bind(null, Client)),
    validFields
], postUser);
usersRouter.put('/:id', [
    check('id').custom(existsRecordById.bind(null, User)),
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    check('usuario', 'La longitud máxima es de 30 caracteres').isLength({max: 30}),
    validFields
], putUser);
usersRouter.delete('/:id', [
    check('id').custom(existsRecordById.bind(null, User)),
    check('id').custom(hasChildren.bind(null, User)),
    validFields
], deleteUser);

export default usersRouter;