import express from "express";
import cors from "cors";

import { reqLogger } from "./middlewares/logger";
import * as routes from "./routes";
import { allowedOrigins } from "./util/allowedOrigins";

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
        preflightContinue: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        origin: true,
        credentials: true,
      })
    );
    this.server.use(express.urlencoded({ extended: false }));
  }

  routes() {
    this.server.use("/api/slug", reqLogger, routes.SlugRouter);
    this.server.use("/api/status", reqLogger, routes.StatusRouter);
    this.server.use("/api/user", reqLogger, routes.UserRouter);
    this.server.use("/api/userInsured", reqLogger, routes.UserInsuredRouter);
    this.server.use("/api/userCompany", reqLogger, routes.UserCompanyRouter);
    this.server.use("/api/channel", reqLogger, routes.ChannelRouter);
    this.server.use("/api/family", reqLogger, routes.FamilyRouter);
    this.server.use("/api/insured", reqLogger, routes.InsuredRouter);
    this.server.use("/api/beneficiary", reqLogger, routes.BeneficiaryRouter);
    this.server.use("/api/donor", reqLogger, routes.DonorRouter);
    this.server.use("/api/donation", reqLogger, routes.DonationRouter);
    this.server.use("/api/company", reqLogger, routes.CompanyRouter);
    this.server.use("/api/customer", reqLogger, routes.CustomerRouter);
    this.server.use("/api/product", reqLogger, routes.ProductRouter);
    this.server.use("/api/lead", reqLogger, routes.LeadRouter);
    this.server.use("/api/webhook", reqLogger, routes.WebHookRouter);
    this.server.use("/api/transaction", reqLogger, routes.TransactionRouter);
    this.server.use("/api/agent", reqLogger, routes.AgentRouter);
    this.server.use(
      "/api/productDescription",
      reqLogger,
      routes.ProductDescriptionRouter
    );
    this.server.use("/api/broker", reqLogger, routes.BrokerRouter);
    this.server.use("/api/retail", reqLogger, routes.RetailRouter);
    this.server.use("/api/userBroker", reqLogger, routes.UserBrokerRouter);
    this.server.use("/api/userRetail", reqLogger, routes.UserRetailRouter);
    this.server.use("/api/district", reqLogger, routes.DistrictRouter);
    this.server.use("/api/assistance", reqLogger, routes.AssistanceRouter);
    this.server.use("/api/value", reqLogger, routes.ValueRouter);
    this.server.use("/api/valueType", reqLogger, routes.ValueTypeRouter);
    this.server.use("/api/contractor", reqLogger, routes.ContractorRouter);
    this.server.use("/api/specialty", reqLogger, routes.SpecialtyRouter);
    this.server.use("/api/document", reqLogger, routes.DocumentRouter);
    this.server.use("/api/stage", reqLogger, routes.StageRouter);
    this.server.use("/api/specialist", reqLogger, routes.SpecialistRouter);
    this.server.use("/api/relationship", reqLogger, routes.RelationshipRouter);
    this.server.use("/api/partner", reqLogger, routes.PartnerRouter);
    this.server.use("/api/import", reqLogger, routes.ImportRouter);
    this.server.use("/api/case", reqLogger, routes.CaseRouter);
    this.server.use("/api/category", reqLogger, routes.CategoryRouter);
    this.server.use("/api/fileFormat", reqLogger, routes.FileFormatRouter);
    this.server.use("/api/field", reqLogger, routes.FieldRouter);
  }
}

export default new App().server;
