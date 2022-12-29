import moment from "moment";

import pool from "../util/database";

const create: any = async (lack: number) => {
  try {
    const date = moment(new Date()).local();
    const todayDate = date.format("YYYY-MM-DD");
    const lackDate = date.add(lack, "days");

    const resultPolicy = await pool.query(
      `INSERT   INTO app.policy(
                  createdate,
                  startdate)
         VALUES  ($1, $2)
         RETURNING *`,
      [todayDate, lackDate]
    );

    return { success: true, data: resultPolicy.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create };
