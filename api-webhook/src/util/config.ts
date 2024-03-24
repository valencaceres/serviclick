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
  apiURL: process.env.API_URL || "http://localhost:3001",
  apiKEY: process.env.API_KEY || "1234",
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0,
  reveniu: {
    URL: {
      plan: "https://production.reveniu.com/api/v1/plans/",
      subscription: "https://production.reveniu.com/api/v1/subscriptions/",
    },
    apiKey: {
      "Reveniu-Secret-Key": process.env.REVENIU_SECRET_KEY || "",
    },
    feedbackURL: {
      success: process.env.SUCCESS || "http://localhost:3000/resume/success",
      error: process.env.ERROR || "http://localhost:3000/resume/error",
    },
  },
  webHook: {
    URL: {
      subscriptionActivated:
        "https://api.serviclick.cl/api/webHook/subscriptionActivated",
    },
  },
  email: {
    URL: {
      send: `${process.env.API_EMAIL_URL}/api/email/send`,
    },
    apiKey: { id: process.env.API_EMAIL_KEY },
  },
};

export default config;
