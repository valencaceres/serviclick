import express from "express";
import http from "http"; // Importa el módulo http
import cors from "cors";
import { Server } from "socket.io"; // Importa el módulo socket.io

import createLogger from "./utils/logger";

class App {
  public server: any;
  public io: any;

  constructor() {
    this.server = express();
    this.initializeSocketIO();
    this.middlewares();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(
      cors({
        credentials: true,
        preflightContinue: true,
        methods: ["GET", "POST"],
        origin: true,
      })
    );
    this.server.use(express.urlencoded({ extended: false }));
  }

  initializeSocketIO() {
    const httpServer = http.createServer(this.server);

    this.io = new Server(httpServer, {
      cors: {
        origin: true,
        methods: ["GET", "POST"],
      },
    });

    this.io.on("connection", (socket: any) => {
      createLogger.info({
        on: "connection",
        message: `User connected`,
      });

      socket.on("row", (data: any) => {
        createLogger.info({
          on: "row",
          data,
        });
        socket.broadcast.emit("rowResponse", data);
      });

      socket.on("summary", (data: any) => {
        createLogger.info({
          on: "summary",
          data,
        });
        socket.broadcast.emit("summaryResponse", data);
      });

      socket.on("disconnect", () => {
        createLogger.info({
          on: "disconect",
          message: `User disconnected`,
        });
      });
    });

    const PORT = process.env.HTTP_PORT;
    httpServer.listen(PORT, () => {
      createLogger.info({
        on: "init",
        message: `server listening on http://localhost:${PORT}`,
      });
    });
  }
}

export default new App().server;
