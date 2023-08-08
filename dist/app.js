"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesFunction = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./models/server"));
dotenv_1.default.config();
const server = new server_1.default();
server.listen();
// Exportamos la constante routesFunction para que pueda ser utilizada por la función Lambda
exports.routesFunction = server.serverRoutesFunction.bind(server);
//# sourceMappingURL=app.js.map