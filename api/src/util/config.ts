import cnf from "dotenv";
cnf.config();

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
    // production.reveniu.com
    URL: {
      plan: "https://integration.reveniu.com/api/v1/plans/",
      subscription: "https://integration.reveniu.com/api/v1/subscriptions/",
    },
    apiKey: {
      "Reveniu-Secret-Key": process.env.REVENIU_SECRET_KEY || "",
    },
    feedbackURL: {
      success: process.env.SUCCESS || "http://localhost:3000/resume/success",
      error: process.env.ERROR || "http://localhost:3000/resume/error",
    },
  },
  email: {
    URL: {
      send: "https://api-email.serviclick.cl/api/email/send",
    },
    apiKey: { id: "12345678" },
  },
  webHook: {
    URL: {
      reveniu: "https://webhook.serviclick.cl/reveniu",
    },
  },
};

export default config;
