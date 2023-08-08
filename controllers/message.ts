import { Request, Response } from 'express';
import Message from '../models/message';
import Client from '../models/client';
import User from '../models/user';
import Campaign from '../models/campaign';
import { Op, WhereOptions } from 'sequelize';

/**
 * Lista los mensajes activos
 * @param { Request } req 
 * @param { Response } res 
 */
export const getMessages = async(req: Request, res: Response) => {
    const { page = 1, limit = 10} = req.query;
    const skipValue = parseInt(page as string) * parseInt(limit as string) - parseInt(limit as string);
    const limitValue = parseInt(limit as string);

    const [total, messages] = await Promise.all([
        Message.count({
            include: [{
                model: Campaign,
                include: [{
                    model: User,
                    include: [{
                        model: Client
                    }],
                    required: true
                }],
                required: true
            }],
            where: {
                estado: true
            }
        }),
        Message.findAll({
            include: [{
                model: Campaign,
                include: [{
                    model: User,
                    include: [{
                        model: Client
                    }],
                    required: true
                }],
                required: true
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
        messages
    });
}

/**
 * Lista un mensaje específico a través de su id
 * @param { Request } req 
 * @param { Response } res 
 */
export const getMessage = async(req: Request, res: Response) => {
    const { id } = req.params;

    const message = await Message.findByPk(id);

    res.json(message);
}

/**
 * Crea un nuevo mensaje relacionado a una campaña
 * @param { Request } req 
 * @param { Response }res 
 */
export const postMessage = async(req: Request, res: Response) => {
    const { fechaHoraEnvio, mensaje, idCampania } = req.body;

    try {
        const message = Message.build({
            fechaHoraEnvio: new Date(fechaHoraEnvio),
            mensaje: mensaje.trim(),
            idCampania
        });
        const newMessage = await Message.create(message.get({plain: true}));
        res.status(201).json(newMessage);
    } catch (error) {
        return res.status(500).json({
            msg: 'Contacte al administrador'
        });
    }
}

/**
 * Actualiza un mensaje ubicado por su id y relacionado a una campaña
 * @param { Request } req 
 * @param { Response } res 
 */
export const putMessage = async(req: Request, res: Response) => {
    const { id } = req.params;
    const { fechaHoraEnvio, mensaje, estadoEnvio } = req.body;

    try {
        const message = await Message.findByPk(id);

        if(!message) {
            return res.status(404).json({
                msg: `No existe el mensaje con el id ${id}`
            });
        }

        await message.update({
            fechaHoraEnvio: new Date(fechaHoraEnvio),
            estadoEnvio,
            mensaje: mensaje.trim()
        });

        res.json(message);
    } catch (error) {
        return res.status(500).json({
            msg: 'Contacte al administrador'
        });
    }
}

/**
 * Cambia el estado a false de un mensaje ubicado por su id
 * @param { Request} req 
 * @param { Response } res 
 */
export const deleteMessage = async(req: Request, res: Response) => {
    const { id } = req.params;

    const message = await Message.findByPk(id);

    if(!message){
        return res.status(404).json({
            msg: `No existe el mensaje con el id ${id}`
        });
    }

    await message.update({estado: false});

    res.json(message);
}

/**
 * Búsquedas personalizadas de mensajes. 
 * Se puede buscar por idCliente, estadoEnvio, fechaInicio, fechaFin y texto
 * @param { Request } req 
 * @param { Response } res 
 */
export const searchMessages = async(req: Request, res: Response) => {
    const { page = 1, limit = 10} = req.query;
    const { idCliente, estadoEnvio, fechaInicio, fechaFin, texto } = req.body;
    const skipValue = parseInt(page as string) * parseInt(limit as string) - parseInt(limit as string);
    const limitValue = parseInt(limit as string);

    let filters: WhereOptions<any> = {
        estado: true
    }

    let clientFilter: WhereOptions<any> = {
        estado: true
    }

    if(estadoEnvio) {
        filters = {...filters, estadoEnvio};
    }

    if(fechaInicio && fechaFin) {
        filters = {...filters, fechaHoraEnvio: {
            [Op.between]: [new Date(fechaInicio), new Date(fechaFin)]
        }};
    }

    if(fechaInicio && !fechaFin) {
        filters = {...filters, fechaHoraEnvio: {
            [Op.gte]: new Date(fechaInicio)
        }};
    }

    if(!fechaInicio && fechaFin) {
        filters = {...filters, fechaHoraEnvio: {
            [Op.lte]: new Date(fechaFin)
        }};
    }

    if(texto){
        filters = {...filters, mensaje: {
            [Op.like]: `%${texto}%`
        }};
    }

    if(idCliente){
        clientFilter = {...clientFilter, idCliente};
    }

    const [total, messages] = await Promise.all([
        Message.count({
            include: [{
                model: Campaign,
                include: [{
                    model: User,
                    include: [{
                        model: Client,
                        where: clientFilter
                    }],
                    required: true
                }],
                required: true
            }],
            where: filters
        }),
        Message.findAll({
            include: [{
                model: Campaign,
                include: [{
                    model: User,
                    include: [{
                        model: Client,
                        where: clientFilter
                    }],
                    required: true
                }],
                required: true
            }],
            where: filters,
            offset: skipValue,
            limit: limitValue
        })
    ]);

     res.json({
        total,
        messages
    });
}