import cnf from "dotenv";
cnf.config();

const config = {
  apiPort: process.env.API_PORT,
  apiKey: process.env.API_KEY,
  emailService: process.env.EMAIL_SERVICE,
  emailHost: process.env.EMAIL_HOST,
  emailLogin: process.env.EMAIL_LOGIN,
  emailPassword: process.env.EMAIL_PASSWORD,
};

export default config;
