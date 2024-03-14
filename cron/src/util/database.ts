import pg from "pg";
import path from "path";
import fs from "fs";

import config from "./config";
import createLogger from "./logger";

const { Pool } = pg;
const { dbHost, dbUser, dbPassword, dbName } = config;

const pool = new Pool({
  user: dbUser,
  host: dbHost,
  database: dbName,
  password: dbPassword,
  port: 5432,
  keepAlive: true,
});

pool.connect(function (err) {
  if (err) {
    createLogger.error({
      util: "database",
      error: err,
    });
    return;
  }

  createLogger.info({
    util: "database",
    message: "Database connected",
  });
});

export default pool;
