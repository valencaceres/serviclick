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
    URL: {
      plan: process.env.REVENIU_PLAN_URL || "https://integration.reveniu.com/api/v1/plans/",
      subscription: process.env.REVENIU_SUBSCRIPTION_URL || "https://integration.reveniu.com/api/v1/subscriptions/",
    },
    apiKey: {
      "Reveniu-Secret-Key":
      process.env.REVENIU_SECRET_KEY || "EuG-6eULAwlqRRaLLi9HUcLSbO4I-ipd60zY",
    },
    feedbackURL: {
      success:
       process.env.REVENIU_FEEDBACK_SUCCESS_URL || "http://localhost:3000/resume/success",
      error:
       process.env.REVENIU_FEEDBACK_ERROR_URL || "http://localhost:3000/resume/error",
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
      reveniu: process.env.REVENIU_WEEBHOOK_URL || "https://webhook.serviclick.cl/reveniu",
    },
  },
  clerkPemKey: process.env.CLERK_PEM_PUBLIC_KEY,
};

export default config;
