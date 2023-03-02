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
    this.server.use("/integration/insured", reqLogger, routes.InsuredRouter);
    this.server.use("/integration/customer", reqLogger, routes.CustomerRouter);
  }
}

export default new App().server;
