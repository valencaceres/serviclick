import config from "./utils/config";
import createLogger from "./utils/loggers";
import app from "./app";

const { apiUrl } = config;

app.listen(apiUrl);
createLogger.info(`API listening port ${apiUrl}`);
