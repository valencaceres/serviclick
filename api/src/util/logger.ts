import { createLogger, format, transports } from "winston";

export default createLogger({
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.json()
  ),
  transports: [
    new transports.File({
      maxsize: 512000,
      filename: `${__dirname}/../logs/log-api.log`,
    }),
    new transports.Console({ level: "debug" }),
  ],
});
