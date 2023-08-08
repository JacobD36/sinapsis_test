import { Request, Response } from 'express';
import User from '../models/user';
import Client from '../models/client';

/**
 * Lista los usuarios activos
 * @param { Request }req 
 * @param { Response } res 
 */
export const getUsers = async(req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const skipValue = parseInt(page as string) * parseInt(limit as string) - parseInt(limit as string);
    const limitValue = parseInt(limit as string);

    const [total, users] = await Promise.all([
        User.count({
            include: [{
                model: Client
            }],
            where: {
                estado: true
            }
        }),
        User.findAll({
            include: [{
                model: Client
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
}

/**
 * Lista un usuario ubicado por su id
 * @param { Request } req 
 * @param { Response } res 
 */
export const getUser = async(req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findByPk(id);

    res.json(user);
}

/**
 * Crea un nuevo usuario relacionado a un cliente
 * @param { Request } req 
 * @param { Response } res 
 */
export const postUser = async(req: Request, res: Response) => {
    const { usuario, idCliente } = req.body;

    try {
        const user = User.build({usuario: usuario.trim().toUpperCase(), idCliente});
        const newUser = await User.create(user.get({plain: true}));
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({
            msg: 'Contacte al administrador'
        });
    }
}

/**
 * Actualiza un usuario ubicado por su id y relacionado a un cliente
 * @param { Request } req 
 * @param { Response } res 
 */
export const putUser = async(req: Request, res: Response) => {
    const { id } = req.params;
    const { usuario } = req.body;

    try {
        const user = await User.findByPk(id);

        if(!user) {
            return res.status(404).json({
                msg: `No existe un usuario con el id ${id}`
            });
        }

        await user.update({usuario: usuario.trim().toUpperCase()});
        
        res.json(user);
    } catch (error) {
        res.status(500).json({
            msg: 'Contacte al administrador'
        });
    }
}

/**
 * Cambia el estado a false de un usuario ubicado por su id
 * @param { Request } req 
 * @param { Response } res 
 */
export const deleteUser = async(req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);

        if(!user) {
            return res.status(404).json({
                msg: `No existe un usuario con el id ${id}`
            });
        }

        await user.update({estado: false});

        res.json(user);
    } catch (error) {
        res.status(500).json({
            msg: 'Contacte al administrador'
        });
    }
}