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
    this.server.use("/api/user", reqLogger, routes.UserRouter);
    this.server.use("/api/userInsured", reqLogger, routes.UserInsuredRouter);
    this.server.use("/api/userCompany", reqLogger, routes.UserCompanyRouter);
    this.server.use("/api/channel", reqLogger, routes.ChannelRouter);
    this.server.use("/api/family", reqLogger, routes.FamilyRouter);
    this.server.use("/api/insured", reqLogger, routes.InsuredRouter);
    this.server.use("/api/company", reqLogger, routes.CompanyRouter);
    this.server.use("/api/product", reqLogger, routes.ProductRouter);
    this.server.use("/api/lead", reqLogger, routes.LeadRouter);
    this.server.use("/api/webhook", reqLogger, routes.WebHookRouter);
  }
}

export default new App().server;
