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
      plan: `https://${environment["dev"].domain}/api/v1/plans/`,
      subscription: `https://${environment["dev"].domain}/api/v1/subscriptions/`,
    },
    apiKey: {
      "Reveniu-Secret-Key":
        environment["dev"].secretKey || "EuG-6eULAwlqRRaLLi9HUcLSbO4I-ipd60zY",
    },
    feedbackURL: {
      success:
        environment["dev"].feedBack.success ||
        "http://localhost:3000/resume/success",
      error:
        environment["dev"].feedBack.error ||
        "http://localhost:3000/resume/error",
    },
  },
  email: {
    URL: {
      send: "https://api-email.serviclick.cl/api/email/send",
    },
    apiKey: { id: "12345678" },
  },
  pdf: {
    URL: {
      contract: "https://api-pdf.serviclick.cl/api/document/contract",
      annex: "https://api-pdf.serviclick.cl/api/document/annex",
    },
    apiKey: { id: "97689458-b21c-4abf-9bb3-a05ac52b4791" },
  },
  webHook: {
    URL: {
      reveniu: environment["dev"].feedBack.webHook,
    },
  },
};

/*
  reveniu: {
    URL: {
      plan: `https://integration.reveniu.com/api/v1/plans/`,
      subscription: `https://integration.reveniu.com/api/v1/subscriptions/`,
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
*/

export default config;
