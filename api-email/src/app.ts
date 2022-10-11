import express from "express";
import cors from "cors";

import { reqLogger } from "./middlewares/logger";
import * as routes from "./routes";

class App {
  public server: any;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(
      cors({
        credentials: true,
        preflightContinue: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        origin: true,
      })
    );
    this.server.use(express.urlencoded({ extended: false }));
  }

  routes() {
    this.server.use("/api/email", reqLogger, routes.EmailRouter);
  }
}

export default new App().server;
