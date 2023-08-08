import { Model, ModelStatic } from "sequelize";
import User from "../models/user";
import Campaign from "../models/campaign";
import Message from "../models/message";

/**
 * Verifica si existe un registro con el ID proporcionado
 * @param { ModelStatic<Model>} model 
 * @param { any } id 
 */
export const existsRecordById = async(model: ModelStatic<Model>, id: any) => {
    const existsRecord = await model.findByPk(id);
    if(!existsRecord) {
        throw new Error(`El id ${id} no existe`);
    }
}

/**
 * Verifica si existen registros foráneos
 * @param { ModelStatic<Model>} model 
 * @param { any } id 
 */
export const hasChildren = async(model: ModelStatic<Model>, id: any) => {
    let hasChildren: any;

    switch(model.name) {
        case 'cliente':
            hasChildren = await User.count({where: {idCliente: id, estado: true}});
            break;
        case 'usuario':
            hasChildren = await Campaign.count({where: {idUsuario: id, estado: true}});
            break;
        case 'campania':
            console.log('Paso por aqui');
            hasChildren = await Message.count({where: {idCampania: id, estado: true}});
            break;
    }

    if(hasChildren) {
        throw new Error(`El id ${id} no puede ser eliminado porque tiene registros asociados`);
    }
}

/**
 * Valida la fecha y hora proporcionada
 * @param { String } date 
 * @returns { Boolean }
 */
export const isValidDate = async(date: string) => {
    const dateTimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

    if (!dateTimeRegex.test(date)) {
        return false;
    }

    const newDate = new Date(date);

    if(isNaN(newDate.getTime())) {
        throw new Error(`La fecha ${date} no es válida`);
    }
}

/**
 * Verifica si la fecha proporcionada es mayor a la fecha actual
 * @param { String} validDate 
 * @returns { Boolean }
 */
export const dateinTime = async(validDate: string) => {
    const date = new Date();
    const dateValue = new Date(validDate);
    if(dateValue < date) {
        throw new Error('La fecha y hora deben ser mayor a la fecha y hora actual');
    }
    return true;
}

/**
 * Verifica el estado proporcionado
 * @param { Number }state 
 * @returns { Boolran }
 */
export const validState = async(state: number) => {
    const states = [1,2,3];
    if(!states.includes(state)){
        throw new Error('El estado proporcionado no es válido');
    }
    return true;
}