import pool from "../utils/db";
import moment from "moment";

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

export {create}