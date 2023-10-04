import moment from "moment";

import pool from "../util/database";
import createLogger from "../util/logger";

const getAll: any = async () => {
  try {
    const dateNow = moment(new Date()).local().format();

    const result = await pool.query(
      `   SELECT  id,
                  createddate,
                  subscription_id,
                  event
          FROM    app.cron
          WHERE   processingdate IS NULL`
    );
    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const process: any = async (id: number) => {
  try {
    const dateNow = moment(new Date()).local().format();

    const result = await pool.query(
      `
          UPDATE  app.cron
          SET     processingdate = $2
          WHERE   id = $1 RETURNING *`,
      [id, dateNow]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { getAll, process };
