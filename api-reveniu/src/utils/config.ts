import cnf from "dotenv";
cnf.config();

const config = {
  apiKey: process.env.API_KEY,
  apiPort: process.env.API_PORT || "3026",
  apiName: process.env.API_NAME,
  reveniuSecret: process.env.REVENIU_SECRET,
  integration: process.env.REVENIU_URL_INTEGRATION,
  success: process.env.REVENIU_URL_SUCCESS,
  error: process.env.REVENIU_URL_ERROR,
};

export default config;
