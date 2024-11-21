import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";
import helmet from "helmet";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { setSecurityHeaders } from "./middlewares/setSecurityHeaders";
import { allowedOrigins } from "./middlewares/allowedOrigins";
import { verifyToken } from "./middlewares/verifyToken";
import handlerResponse from "./middlewares/handlerResponse";
import handlerRequest from "./middlewares/handlerRequest";
import handlerError from "./middlewares/handlerError";

import createLogger from "./utils/logger";
import config from "./utils/config";

import * as routers from "./routers";
import insuredRoutes from "./routers/insured";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API Documentation",
    },
    servers: [
      {
        url: `${config.apiURL}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // Esto indica que se usará JWT como token Bearer
        },
      },
      parameters: {
        idHeader: {
          in: "header",
          name: "id",
          schema: {
            type: "string",
          },
          required: true,
          description: "API Key",
        },
      },
    },
    security: [
      {
        bearerAuth: [], // Esto asegura que todas las rutas, por defecto, usan Bearer Token
      },
    ],
  },
  apis: ["./src/routers/*.ts", "./routers/*.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

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

const routerMappings = [
  { path: "/user", router: routers.userRouter },
  { path: "/product", router: routers.productRouter },
  { path: "/insured", router: routers.insuredRouter },
];

function initializeRoutes(server: Express) {
  routerMappings.forEach((router) => {
    server.use(router.path, verifyToken, router.router, handlerError);
  });

  server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  server.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError && err.message.includes("JSON")) {
      return res.status(400).json({ error: "Json Request Format is invalid" });
    }

    return res.status(500).json({ error: "Internal server error" });
  });

  const virtualPath = "/<<virtualPath>>";
  const diskPath = path.join(__dirname, "..", "<<diskPath>>");
  server.use(virtualPath, express.static(diskPath));
}

const server = express();

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
server.use(handlerRequest);

initializeRoutes(server);

server.use(handlerError);
server.use(handlerResponse);

export default server;
