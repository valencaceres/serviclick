import express from "express";
import http from "http"; // Importa el módulo http
import cors from "cors";
import { Server } from "socket.io"; // Importa el módulo socket.io

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
      socket.on("row", (data: any) => {
        socket.broadcast.emit("rowResponse", data);
      });

      socket.on("summary", (data: any) => {
        socket.broadcast.emit("summaryResponse", data);
      });

      socket.on("disconnect", () => {});
    });

    const PORT = process.env.HTTP_PORT;
    httpServer.listen(PORT, () => {
      console.log(`HTTP server listening on
      http://localhost:${PORT}`);
    });
  }
}

export default new App().server;
