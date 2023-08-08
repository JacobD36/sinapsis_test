"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../database/connection"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const client_1 = __importDefault(require("../routes/client"));
const user_1 = __importDefault(require("../routes/user"));
const campaign_1 = __importDefault(require("../routes/campaign"));
const message_1 = __importDefault(require("../routes/message"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const path = __importStar(require("path"));
class Server {
    constructor() {
        this.apiPaths = {
            clients: '/api/clients',
            users: '/api/users',
            campaigns: '/api/campaigns',
            messages: '/api/messages',
        };
        this.swaggerDocument = yamljs_1.default.load(path.join(__dirname, '../swagger.yaml'));
        // Métodos iniciales
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8080';
        // Conectar a base de datos
        this.dbConnection();
        // Middlewares
        this.middlewares();
        // Definición de rutas
        this.routes();
    }
    getApp() {
        return this.app;
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                connection_1.default.sync();
                console.log('Database online');
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    routes() {
        this.app.use(this.apiPaths.clients, client_1.default);
        this.app.use(this.apiPaths.users, user_1.default);
        this.app.use(this.apiPaths.campaigns, campaign_1.default);
        this.app.use(this.apiPaths.messages, message_1.default);
        // Rutas de documentación
        this.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(this.swaggerDocument));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
    middlewares() {
        // CORS
        this.app.use((0, cors_1.default)());
        // Lectura del body
        this.app.use(express_1.default.json());
        // Carpeta pública
        this.app.use(express_1.default.static('public'));
    }
    // Función que actuará como handler para la función Lambda serverRoutesFunction
    serverRoutesFunction(event, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const appHandler = (0, serverless_http_1.default)(this.app);
            return yield appHandler(event, context);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map