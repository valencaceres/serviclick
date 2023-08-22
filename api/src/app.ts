import express, { Express } from "express";
import cors from "cors";
import * as routes from "./routes";
import { reqLogger } from "./middlewares/logger";
import { allowedOrigins } from "./util/allowedOrigins";
import createLogger from "../src/util/logger";
import { setSecurityHeaders } from "./middlewares/setSecurityHeaders";

const corsOptions = {
  preflightContinue: false,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (process.env.ENV !== "dev") {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        createLogger.error({
          controller: "CORS",
          error: "Not allowed by CORS, origin: " + origin,
        });
        callback(null, false);
      }
    } else {
      callback(null, true);
    }
  },
  credentials: true,
};

function initializeMiddlewares(server: Express) {
  server.use(setSecurityHeaders);
  server.use(express.json());
  server.use(cors(corsOptions));
  server.use(express.urlencoded({ extended: false }));
}

const routeMappings = [
  { path: "/api/slug", router: routes.SlugRouter },
  { path: "/api/status", router: routes.StatusRouter },
  { path: "/api/user", router: routes.UserRouter },
  { path: "/api/userInsured", router: routes.UserInsuredRouter },
  { path: "/api/userCompany", router: routes.UserCompanyRouter },
  { path: "/api/channel", router: routes.ChannelRouter },
  { path: "/api/family", router: routes.FamilyRouter },
  { path: "/api/insured", router: routes.InsuredRouter },
  { path: "/api/beneficiary", router: routes.BeneficiaryRouter },
  { path: "/api/donor", router: routes.DonorRouter },
  { path: "/api/donation", router: routes.DonationRouter },
  { path: "/api/company", router: routes.CompanyRouter },
  { path: "/api/customer", router: routes.CustomerRouter },
  { path: "/api/product", router: routes.ProductRouter },
  { path: "/api/lead", router: routes.LeadRouter },
  { path: "/api/webhook", router: routes.WebHookRouter },
  { path: "/api/transaction", router: routes.TransactionRouter },
  { path: "/api/agent", router: routes.AgentRouter },
  { path: "/api/productDescription", router: routes.ProductDescriptionRouter },
  { path: "/api/broker", router: routes.BrokerRouter },
  { path: "/api/retail", router: routes.RetailRouter },
  { path: "/api/userBroker", router: routes.UserBrokerRouter },
  { path: "/api/userRetail", router: routes.UserRetailRouter },
  { path: "/api/district", router: routes.DistrictRouter },
  { path: "/api/assistance", router: routes.AssistanceRouter },
  { path: "/api/value", router: routes.ValueRouter },
  { path: "/api/valueType", router: routes.ValueTypeRouter },
  { path: "/api/contractor", router: routes.ContractorRouter },
  { path: "/api/specialty", router: routes.SpecialtyRouter },
  { path: "/api/document", router: routes.DocumentRouter },
  { path: "/api/stage", router: routes.StageRouter },
  { path: "/api/specialist", router: routes.SpecialistRouter },
  { path: "/api/relationship", router: routes.RelationshipRouter },
  { path: "/api/partner", router: routes.PartnerRouter },
  { path: "/api/import", router: routes.ImportRouter },
  { path: "/api/case", router: routes.CaseRouter },
  { path: "/api/category", router: routes.CategoryRouter },
  { path: "/api/fileFormat", router: routes.FileFormatRouter },
  { path: "/api/field", router: routes.FieldRouter },
];

function initializeRoutes(server: Express) {
  routeMappings.forEach((route) => {
    server.use(route.path, reqLogger, route.router);
  });
}

const server = express();
initializeMiddlewares(server);
initializeRoutes(server);

export default server;
