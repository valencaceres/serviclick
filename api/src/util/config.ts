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
  reveniu: {
    URL: {
      plan: `https://${environment["prod"].domain}/api/v1/plans/`,
      subscription: `https://${environment["prod"].domain}/api/v1/subscriptions/`,
    },
    apiKey: {
      "Reveniu-Secret-Key":
        environment["prod"].secretKey || "EuG-6eULAwlqRRaLLi9HUcLSbO4I-ipd60zY",
    },
    feedbackURL: {
      success:
        environment["prod"].feedBack.success ||
        "http://localhost:3000/resume/success",
      error:
        environment["prod"].feedBack.error ||
        "http://localhost:3000/resume/error",
    },
  },
  email: {
    URL: {
      send: `${process.env.API_EMAIL_URL}/api/email/send`,
    },
    apiKey: { id: process.env.API_EMAIL_KEY },
  },
  pdf: {
    URL: {
      contract: `${process.env.API_PDF_URL}/api/document/contract`,
      annex: `${process.env.API_PDF_URL}/api/document/annex`,
    },
    apiKey: { id: process.env.API_PDF_KEY },
  },
  webHook: {
    URL: {
      reveniu: environment["prod"].feedBack.webHook,
    },
  },
};

export default config;
