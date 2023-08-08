import { Request, Response } from 'express';
import Client from '../models/client';

/**
 * Lista los clientes activos
 * @param { Request } req 
 * @param { Response } res 
 */
export const getClients = async(req: Request, res: Response) => {
    const { page = 1, limit = 10} = req.query;
    const skipValue = parseInt(page as string) * parseInt(limit as string) - parseInt(limit as string);
    const limitValue = parseInt(limit as string);

    const [total, clients] = await Promise.all([
        Client.count({
            where: {
                estado: true
            }
        }),
        Client.findAll({
            where: {
                estado: true
            },
            offset: skipValue,
            limit: limitValue
        })
    ]);

    res.json({
        total,
        clients
    });
}

/**
 * Lista un cliente ubicado por su id
 * @param { Request }req 
 * @param { Response } res 
 */
export const getClient = async(req: Request, res: Response) => {
    const { id } = req.params;

    const client = await Client.findByPk(id);

    res.json(client);
}

/**
 * Crea un nuevo cliente
 * @param { Request } req 
 * @param { Response } res 
 */
export const postClient = async(req: Request, res: Response) => {
    const { nombre } = req.body;

    try {
        const client = Client.build({nombre: nombre.trim().toUpperCase()});
        const newClient = await Client.create(client.get({plain: true}));
        res.status(201).json(newClient);   
    } catch (error) {
        return res.status(500).json({
            msg: 'Contacte al administrador'
        });
    }
}

/**
 * Actualiza un cliente ubicado por su id
 * @param { Request } req 
 * @param { Response }res 
 */
export const putClient = async(req: Request, res: Response) => {
    const { id } = req.params;
    const { nombre } = req.body;

    try {
        const client = await Client.findByPk(id);

        if(!client) {
            return res.status(404).json({
                msg: `No existe un cliente con el id ${id}`
            });
        }

        await client.update({nombre: nombre.trim().toUpperCase()});

        res.json(client);
    } catch (error) {
        return res.status(500).json({
            msg: 'Contacte al administrador'
        });
    }
}

/**
 * Cambia el estado de un cliente a false
 * @param { Request } req 
 * @param { Response }res 
 */
export const deleteClient = async(req: Request, res: Response) => {
    const { id } = req.params;

    const client = await Client.findByPk(id);

    if(!client) {
        return res.status(404).json({
            msg: `No existe un cliente con el id ${id}`
        });
    }

    await client.update({ estado: false });

    res.json(client);
}