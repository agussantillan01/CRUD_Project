"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize(process.env.DB_NAME || "COMERCIO_DB", process.env.DB_USER || "root", process.env.DB_PASS || "root", {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false,
});
exports.default = db;
//# sourceMappingURL=connection.js.map