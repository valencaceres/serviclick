import pg from "pg";
import path from "path";
import fs from "fs";

import config from "./config";
import createLogger from "./logger";

const { Pool } = pg;
const { dbHost, dbUser, dbPassword, dbName } = config;

/* 
  username = linpostgres
  password = VTsTvtUE2l^92si9
  host = lin-9038-1973-pgsql-primary.servers.linodedb.net
  private network host = lin-9038-1973-pgsql-primary-private.servers.linodedb.net
  port = 5432
  ssl = ENABLED
*/

const pool = new Pool({
  user: dbUser,
  host: dbHost,
  database: dbName,
  password: dbPassword,
  port: 5432,
  keepAlive: true,
  ssl:
    process.env.ENV === "dev"
      ? false
      : {
          ca: fs.readFileSync(path.join(__dirname, "/certificate.crt")),
        },
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
