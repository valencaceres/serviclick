import config from "./util/config";
import createLogger from "./util/logger";
import app from "./app";

const { apiPort } = config;

app.listen(apiPort);
createLogger.info(`API listening port ${apiPort}`);
