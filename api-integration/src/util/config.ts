import cnf from "dotenv";
cnf.config();

const environment = {
  prod: {
    domain: "production.reveniu.com",
    secretKey: "4bab3BWYeXOZzKjUI4pgY_VIyWW0EoSuJTMf",
    feedBack: {
      success: "https://web.serviclick.cl/resume/success",
      error: "https://web.serviclick.cl/resume/error",
      webHook: "https://webhook.serviclick.cl/reveniu",
    },
  },
  dev: {
    domain: "integration.reveniu.com",
    secretKey: "EuG-6eULAwlqRRaLLi9HUcLSbO4I-ipd60zY",
    feedBack: {
      success: "https://web.serviclick.cl/resume/success",
      error: "https://web.serviclick.cl/resume/error",
      webHook: "https://webhook.serviclick.cl/reveniu",
    },
  },
};

const config = {
  apiPort: process.env.API_PORT || 3001,
  apiKey: process.env.API_KEY || "1234",
  dbHost: process.env.DB_HOST || "localhost",
  dbUser: process.env.DB_USER || "root",
  dbPassword: process.env.DB_PWD || "password",
  dbName: process.env.DB_NAME || "test",
  dbPort: parseInt(process.env.DB_PORT || "5432"),
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0,
 
};

export default config;
