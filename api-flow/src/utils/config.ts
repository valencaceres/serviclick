import cnf from "dotenv";
cnf.config();

const config = {
apiUrl: process.env.API_PORT,
apiKey: process.env.API_KEY,
apiWebhookFlow: process.env.API_WEBHOOK_FLOW_PORT || '',
apiFlow: process.env.API_FLOW_PORT,
apiName: process.env.API_NAME,
dbHost: process.env.DB_HOST,
dbUser: process.env.DB_USER,
dbPassword: process.env.DB_PASSWORD,
dbName: process.env.DB_NAME,
dbPort: process.env.DB_PORT
};

export default config;
