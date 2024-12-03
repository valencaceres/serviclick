import config from "./utils/config";
import createLogger from "./utils/loggers";
import app from "./app";

const { apiPayment } = config;

app.listen(apiPayment);
createLogger.info(`API listening port ${apiPayment}`);

