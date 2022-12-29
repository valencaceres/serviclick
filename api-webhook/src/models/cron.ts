import moment from "moment";

import pool from "../util/database";

const create: any = async (subscription_id: number, event: string) => {
  try {
    const dateNow = moment(new Date()).local().format();

    const result = await pool.query(
      `
        INSERT  INTO app.cron(
                subscription_id,
                event,
                createddate)
        VALUES( $1, $2, $3) RETURNING *`,
      [subscription_id, event, dateNow]
    );
    return { success: true, data: result.rows[0], error: null };
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

export { create, process };
