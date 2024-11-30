import config from "./utils/config";
import createLogger from "./utils/logger";
import app from "./app";

const { apiWebhookFlow } = config;

app.listen(apiWebhookFlow);
createLogger.info(`API listening port ${apiWebhookFlow}`);

