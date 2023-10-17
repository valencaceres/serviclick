import config from "./utils/config";
import createLogger from "./utils/logger";
import app from "./app";

const { apiPort } = config;

app.listen(apiPort);
createLogger.info(`API socket listening port ${apiPort}`);
