import { Request, Response} from 'express';
import Campaign from '../models/campaign';
import User from '../models/user';
import Client from '../models/client';

/**
 * Lista todas las campañas activas
 * @param { Request } req 
 * @param { Response } res 
 */
export const getCampaigns = async(req: Request, res: Response) => {
    const { page = 1, limit = 10} = req.query;
    const skipValue = parseInt(page as string) * parseInt(limit as string) - parseInt(limit as string);
    const limitValue = parseInt(limit as string);

    const [total, campaigns] = await Promise.all([
        Campaign.count({
            include: [{
                model: User,
                include: [{
                    model: Client
                }],
                required: true
            }],
            where: {
                estado: true
            }
        }),
        Campaign.findAll({
            include: [{
                model: User,
                include: [{
                    model: Client
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
        campaigns
    });
}

/**
 * Lista una campaña específica a través de su id
 * @param { Request } req 
 * @param { Response } res 
 */
export const getCampaign = async(req: Request, res: Response) => {
    const { id } = req.params;

    const campaign = await Campaign.findByPk(id);

    res.json(campaign);
}

/**
 * Crea una nueva campaña relacionada a un usuario
 * @param { Request } req 
 * @param { Response } res 
 */
export const postCampaign = async(req: Request, res: Response) => {
    const { nombre, idUsuario, fechaHoraProgramacion } = req.body;

    try {
        const campaign = Campaign.build({
            nombre: nombre.trim().toUpperCase(),
            idUsuario,
            fechaHoraProgramacion: new Date(fechaHoraProgramacion)
        });
        const newCampaign = await Campaign.create(campaign.get({plain: true}));
        res.status(201).json(newCampaign);
    } catch (error) {
        return res.status(500).json({
            msg: 'Contacte al administrador'
        });
    }
}

/**
 * Actualiza una campaña ubicada por su id y relacionada a un usuario
 * @param { Request } req 
 * @param { Response } res 
 */
export const putCampaign = async(req: Request, res: Response) => {
    const { id } = req.params;
    const { nombre, fechaHoraProgramacion } = req.body;

    try {
        const campaign = await Campaign.findByPk(id);

        if(!campaign){
            return res.status(404).json({
                msg: `No existe una campaña con el id ${id}`
            });
        }

        await campaign.update({
            nombre: nombre.trim().toUpperCase(),
            fechaHoraProgramacion: new Date(fechaHoraProgramacion)
        });

        res.json(campaign);
    } catch (error) {
        return res.status(500).json({
            msg: 'Contacte al administrador'
        });
    }
}

/**
 * Cambia el estado de una campaña a false
 * @param { Request } req 
 * @param { Request } res 
 */
export const deleteCampaign = async(req: Request, res: Response) => {
    const { id } = req.params;

    const campaign = await Campaign.findByPk(id);

    if(!campaign) {
        return res.status(404).json({
            msg: `No existe una campaña con el id ${id}`
        });
    }

    await campaign.update({estado: false});

    res.json(campaign);
}