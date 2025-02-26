import { createLogger, format, transports } from "winston";

const datetoString = () => {
  const offset = new Date().getTimezoneOffset();
  const yourDate = new Date(new Date().getTime() + offset * 60 * 1000);
  return yourDate.toISOString().split("T")[0];
};

export default createLogger({
  // Comentario TEST (DEBE IR ESTE COMENTARIO PARA QUE FUNCIONE EL TEST)
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.json()
  ),
  transports: [
    new transports.File({
      maxsize: 512000,
      filename: `${__dirname}/../logs/log-api-${datetoString()}.log`,
    }),
    new transports.Console({ level: "debug" }),
  ],
});
