"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCampaign = exports.putCampaign = exports.postCampaign = exports.getCampaign = exports.getCampaigns = void 0;
const campaign_1 = __importDefault(require("../models/campaign"));
const user_1 = __importDefault(require("../models/user"));
const client_1 = __importDefault(require("../models/client"));
/**
 * Lista todas las campañas activas
 * @param { Request } req
 * @param { Response } res
 */
const getCampaigns = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10 } = req.query;
    const skipValue = parseInt(page) * parseInt(limit) - parseInt(limit);
    const limitValue = parseInt(limit);
    const [total, campaigns] = yield Promise.all([
        campaign_1.default.count({
            include: [{
                    model: user_1.default,
                    include: [{
                            model: client_1.default
                        }],
                    required: true
                }],
            where: {
                estado: true
            }
        }),
        campaign_1.default.findAll({
            include: [{
                    model: user_1.default,
                    include: [{
                            model: client_1.default
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
});
exports.getCampaigns = getCampaigns;
/**
 * Lista una campaña específica a través de su id
 * @param { Request } req
 * @param { Response } res
 */
const getCampaign = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const campaign = yield campaign_1.default.findByPk(id);
    res.json(campaign);
});
exports.getCampaign = getCampaign;
/**
 * Crea una nueva campaña relacionada a un usuario
 * @param { Request } req
 * @param { Response } res
 */
const postCampaign = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, idUsuario, fechaHoraProgramacion } = req.body;
    try {
        const campaign = campaign_1.default.build({
            nombre: nombre.trim().toUpperCase(),
            idUsuario,
            fechaHoraProgramacion: new Date(fechaHoraProgramacion)
        });
        const newCampaign = yield campaign_1.default.create(campaign.get({ plain: true }));
        res.status(201).json(newCampaign);
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Contacte al administrador'
        });
    }
});
exports.postCampaign = postCampaign;
/**
 * Actualiza una campaña ubicada por su id y relacionada a un usuario
 * @param { Request } req
 * @param { Response } res
 */
const putCampaign = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre, fechaHoraProgramacion } = req.body;
    try {
        const campaign = yield campaign_1.default.findByPk(id);
        if (!campaign) {
            return res.status(404).json({
                msg: `No existe una campaña con el id ${id}`
            });
        }
        yield campaign.update({
            nombre: nombre.trim().toUpperCase(),
            fechaHoraProgramacion: new Date(fechaHoraProgramacion)
        });
        res.json(campaign);
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Contacte al administrador'
        });
    }
});
exports.putCampaign = putCampaign;
/**
 * Cambia el estado de una campaña a false
 * @param { Request } req
 * @param { Request } res
 */
const deleteCampaign = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const campaign = yield campaign_1.default.findByPk(id);
    if (!campaign) {
        return res.status(404).json({
            msg: `No existe una campaña con el id ${id}`
        });
    }
    yield campaign.update({ estado: false });
    res.json(campaign);
});
exports.deleteCampaign = deleteCampaign;
//# sourceMappingURL=campaign.js.map