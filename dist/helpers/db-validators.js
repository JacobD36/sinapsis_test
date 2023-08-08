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
exports.validState = exports.dateinTime = exports.isValidDate = exports.hasChildren = exports.existsRecordById = void 0;
const user_1 = __importDefault(require("../models/user"));
const campaign_1 = __importDefault(require("../models/campaign"));
const message_1 = __importDefault(require("../models/message"));
/**
 * Verifica si existe un registro con el ID proporcionado
 * @param { ModelStatic<Model>} model
 * @param { any } id
 */
const existsRecordById = (model, id) => __awaiter(void 0, void 0, void 0, function* () {
    const existsRecord = yield model.findByPk(id);
    if (!existsRecord) {
        throw new Error(`El id ${id} no existe`);
    }
});
exports.existsRecordById = existsRecordById;
/**
 * Verifica si existen registros foráneos
 * @param { ModelStatic<Model>} model
 * @param { any } id
 */
const hasChildren = (model, id) => __awaiter(void 0, void 0, void 0, function* () {
    let hasChildren;
    switch (model.name) {
        case 'cliente':
            hasChildren = yield user_1.default.count({ where: { idCliente: id, estado: true } });
            break;
        case 'usuario':
            hasChildren = yield campaign_1.default.count({ where: { idUsuario: id, estado: true } });
            break;
        case 'campania':
            console.log('Paso por aqui');
            hasChildren = yield message_1.default.count({ where: { idCampania: id, estado: true } });
            break;
    }
    if (hasChildren) {
        throw new Error(`El id ${id} no puede ser eliminado porque tiene registros asociados`);
    }
});
exports.hasChildren = hasChildren;
/**
 * Valida la fecha y hora proporcionada
 * @param { String } date
 * @returns { Boolean }
 */
const isValidDate = (date) => __awaiter(void 0, void 0, void 0, function* () {
    const dateTimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    if (!dateTimeRegex.test(date)) {
        return false;
    }
    const newDate = new Date(date);
    if (isNaN(newDate.getTime())) {
        throw new Error(`La fecha ${date} no es válida`);
    }
});
exports.isValidDate = isValidDate;
/**
 * Verifica si la fecha proporcionada es mayor a la fecha actual
 * @param { String} validDate
 * @returns { Boolean }
 */
const dateinTime = (validDate) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const dateValue = new Date(validDate);
    if (dateValue < date) {
        throw new Error('La fecha y hora deben ser mayor a la fecha y hora actual');
    }
    return true;
});
exports.dateinTime = dateinTime;
/**
 * Verifica el estado proporcionado
 * @param { Number }state
 * @returns { Boolran }
 */
const validState = (state) => __awaiter(void 0, void 0, void 0, function* () {
    const states = [1, 2, 3];
    if (!states.includes(state)) {
        throw new Error('El estado proporcionado no es válido');
    }
    return true;
});
exports.validState = validState;
//# sourceMappingURL=db-validators.js.map