import cnf from "dotenv";
cnf.config();

const config = {
  apiPort: process.env.API_PORT,
  apiKey: process.env.API_KEY,
  apiName: process.env.API_NAME,
  flowApiKey: process.env.FLOW_API_KEY || "",
  flowSecretKey: process.env.FLOW_SECRET_KEY || "",
  flowUrl: process.env.FLOW_API_URL || "",
  flowWebhookUrl: process.env.FLOW_WEBHOOK_URL || "",
};

export default config;
