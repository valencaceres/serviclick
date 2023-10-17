import cnf from "dotenv";
cnf.config();
//cnf.config({ path: __dirname + `/../../.env.${process.env.NODE_ENV}` });

const config = {
  apiPort: process.env.API_PORT || 3016,
  apiKey: process.env.API_KEY || "1234",
};

export default config;
