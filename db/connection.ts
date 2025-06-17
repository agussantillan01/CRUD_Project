import { Sequelize } from "sequelize";

const db = new Sequelize(
  process.env.DB_NAME || "StoreDB",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "root",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false,
  }
);

export default db;
