import cnf from "dotenv";
cnf.config();

const config = {
  apiName: process.env.API_NAME || "api",
  apiPort: process.env.API_PORT || 3001,
  apiKey: process.env.API_KEY || "1234",
  apiURL: process.env.API_PATH || "localhost:3001",
  dbHost: process.env.DB_HOST || "localhost",
  dbName: process.env.DB_NAME || "postgres",
  dbUser: process.env.DB_USER || "postgres",
  dbPassword: process.env.DB_PWD || "password",
  dbPort: parseInt(process.env.DB_PORT || "5432"),
  secretPhrase: process.env.SECRET_PHRASE,
  encryptionKey: process.env.ENCRYPTION_KEY || "",
  retailId: process.env.RETAIL_ID || "1234",
};

export default config;
