import cnf from "dotenv";
cnf.config();
//cnf.config({ path: __dirname + `/../../.env.${process.env.NODE_ENV}` });

const config = {
  apiPort: process.env.API_PORT,
  apiKey: process.env.API_KEY,
  email: {
    ServiClick: {
      emailService: "gmail",
      emailHost: "gmail.smtp.com",
      emailLogin: "no-responder@serviclick.cl",
      emailPassword: "N0R35p0nd3r$_",
    },
    BiciCultura: {
      emailService: "gmail",
      emailHost: "gmail.smtp.com",
      emailLogin: "donaciones@bicicultura.cl",
      emailPassword: "serviclick123",
    },
  },
};

export default config;
