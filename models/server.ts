import express, { Application } from 'express';
import cors from 'cors';
import db from '../database/connection';
import swaggerUI from 'swagger-ui-express';
import yaml from 'yamljs';
import clientsRouter from '../routes/client';
import usersRouter from '../routes/user';
import campaignRouter from '../routes/campaign';
import messageRouter from '../routes/message';
import ServerlessHttp from 'serverless-http';
import * as path from 'path';

class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        clients: '/api/clients',
        users: '/api/users',
        campaigns: '/api/campaigns',
        messages: '/api/messages',
    };

    private swaggerDocument = yaml.load(path.join(__dirname, '../swagger.yaml'));
    
    constructor() {
        // Métodos iniciales
        this.app = express();
        this.port = process.env.PORT || '8080';
        
        // Conectar a base de datos
        this.dbConnection();

        // Middlewares
        this.middlewares();

        // Definición de rutas
        this.routes();
    }

    getApp(): Application  {
        return this.app;
    }

    async dbConnection() {
        try {
            await db.authenticate();
            db.sync();
            console.log('Database online');
        } catch (error: any) {
            throw new Error(error);
        }
    }

    routes() {
        this.app.use(this.apiPaths.clients, clientsRouter);
        this.app.use(this.apiPaths.users, usersRouter);
        this.app.use(this.apiPaths.campaigns, campaignRouter);
        this.app.use(this.apiPaths.messages, messageRouter);
        // Rutas de documentación
        this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(this.swaggerDocument));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura del body
        this.app.use(express.json());

        // Carpeta pública
        this.app.use(express.static('public'));
    }

    // Función que actuará como handler para la función Lambda serverRoutesFunction
    public async serverRoutesFunction(event: any, context: any) {
        const appHandler = ServerlessHttp(this.app);
        return await appHandler(event, context);
    }
}

export default Server;