import express, { Application } from "express";
import storeRoutes from "../routes/product.route";
import cors from "cors";
import db from '../db/connection';
class server {
  private app: Application;
  private port: string;
  private apiPaths = {
    productos: "/api/products",
  };
  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";
    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  async dbConnection() {
    try {
        await db.authenticate();

        
    } catch (error:any) {
        throw new Error(error);
    }
  }

  listen() {
    this.app.listen(this.port, () => {
    });
  }

  routes() {
    this.app.use(this.apiPaths.productos, storeRoutes);
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }
}

export default server;
