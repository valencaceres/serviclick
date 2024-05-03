import cnf from "dotenv";
cnf.config();

const config = {
  apiPort: process.env.API_PORT,
  apiKey: process.env.API_KEY,
  appName: process.env.APP_NAME,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbPort: parseInt(process.env.DB_PORT || "5432"),
};
export default config;
