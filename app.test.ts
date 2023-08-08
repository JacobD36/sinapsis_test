import dotenv from 'dotenv';
import Server from './models/server';
dotenv.config();

describe('Pruebas unitarias para Clientes - /api/clients', () => {
    let server: Server;

    beforeEach(() => {
        server = new Server();
        server.listen();
    });

    test('Crear Cliente - Debe de responder con un status 200', async() => {
       
    });
});