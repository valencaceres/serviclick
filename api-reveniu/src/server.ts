import config from "./utils/config";
import createLogger from "./utils/loggers";
import app from "./app";

const { apiPort } = config;

app.listen(apiPort);
createLogger.info(`API listening port ${apiPort}`);
