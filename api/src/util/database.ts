import pg from "pg";

import config from "./config";

const { Pool } = pg;
const { dbHost, dbUser, dbPassword, dbName } = config;

const pool = new Pool({
  user: dbUser,
  host: dbHost,
  database: dbName,
  password: dbPassword,
  port: 5432,
});

export default pool;
