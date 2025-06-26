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
const express_1 = __importDefault(require("express"));
const local_route_1 = __importDefault(require("../routes/local.route"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/connection"));
class server {
    constructor() {
        this.apiPaths = {
            locales: "/api/locales",
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "3000";
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    listen() {
        this.app.listen(this.port, () => {
        });
    }
    routes() {
        this.app.use(this.apiPaths.locales, local_route_1.default);
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static("public"));
    }
}
exports.default = server;
//# sourceMappingURL=server.js.map