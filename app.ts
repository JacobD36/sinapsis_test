import dotenv from 'dotenv';
import Server from './models/server';
dotenv.config();

const server = new Server();
server.listen();

// Exportamos la constante routesFunction para que pueda ser utilizada por la función Lambda
export const routesFunction = server.serverRoutesFunction.bind(server);