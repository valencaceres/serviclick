import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
/* import { allowedOrigins } from "./util/allowedOrigins";*/
import * as routes from "./routes";
import { reqLogger } from "./middlewares/logger";
import createLogger from "./util/logger";
import { setSecurityHeaders } from "./middlewares/setSecurityHeaders";
import path from "path";
import helmet from "helmet";

const corsOptions = {
  preflightContinue: false,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
/*   origin: (
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
  }, */
  credentials: true,
};

function initializeMiddlewares(server: Express) {
  server.use(setSecurityHeaders);
  server.use(express.json());
  server.use(cors(corsOptions));
  server.use(express.urlencoded({ extended: false }));
  server.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        },
      },
      referrerPolicy: { policy: "strict-origin-when-cross-origin" },
      frameguard: { action: "sameorigin" },
      xssFilter: true,
      noSniff: true,
      hsts: { maxAge: 31536000, includeSubDomains: true },
    })
  );
}

const routeMappings = [
  { path: "/api/generateToken", router: routes.tokenRouter },
  { path: "/api/district", router: routes.DistrictRouter },
  { path: "/api/relationship", router: routes.relationShipRouter },
  { path: "/api/product", router: routes.productRouter },
  { path: "/api/lead", router: routes.leadRouter },
  { path: "/api/payment", router: routes.paymentRouter },
  { path: "/api/document", router: routes.documentRouter },
  { path: "/api/beneficiary", router: routes.beneficiaryRouter },
  { path: "/api/user", router: routes.userRouter },
];

function initializeRoutes(server: Express) {
  routeMappings.forEach((route) => {
    server.use(route.path, reqLogger, route.router);
  });

  server.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError && err.message.includes("JSON")) {
      return res.status(400).json({ error: "Json Request Format is invalid" });
    }

    return res.status(500).json({ error: "Internal server error" });
  });

}

const server = express();
initializeMiddlewares(server);
initializeRoutes(server);

export default server;
