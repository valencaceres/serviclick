import pool from "../util/database";
import { format } from "date-fns";

const create = async (
  customDate?: string | null,
  startDate?: string | null,
  endDate?: string | null,
  lead_id?: string | null
) => {
  try {
    const dateToFormat = customDate ? new Date(customDate) : new Date();
    const createDate = format(dateToFormat, "yyyy-MM-dd HH:mm:ss");
    if (lead_id) {
      const resultLeadPolicy = await pool.query(
        `SELECT policy_id FROM app.lead WHERE id = $1 AND NOT policy_id IS NULL`,
        [lead_id]
      );

      if (resultLeadPolicy.rows.length > 0) {
        endDate &&
          (await pool.query(
            `UPDATE app.policy SET enddate = $1 WHERE id = $2`,
            [endDate, resultLeadPolicy.rows[0].policy_id]
          ));
        return {
          success: true,
          data: { id: resultLeadPolicy.rows[0].policy_id, endDate },
          error: null,
        };
      }
    }

    const response = await pool.query(
      `INSERT INTO app.policy
      (createdate, startdate, enddate)
      VALUES ($1, $2, $3) RETURNING *`,
      [createDate, startDate || createDate, endDate]
    );

    lead_id &&
      (await pool.query(`UPDATE app.lead SET policy_id = $1 WHERE id = $2`, [
        response.rows[0].id,
        lead_id,
      ]));

    return { success: true, data: response.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const createCron: any = async (
  lead_id: string,
  policy_createdate: string,
  policy_startdate: string
) => {
  try {
    const resultPolicy = await pool.query(
      ` INSERT  INTO app.policy(
                createdate,
                startdate)
        VALUES ($1, $2)
        RETURNING *`,
      [policy_createdate, policy_startdate]
    );

    if (resultPolicy.rows.length === 0) {
      return { success: false, data: null, error: "Unregistered policy" };
    }

    const { id: policy_id } = resultPolicy.rows[0];

    const resultLead = await pool.query(
      ` UPDATE  app.lead
        SET     policy_id = $2
        WHERE   id = $1
        RETURNING *`,
      [lead_id, policy_id]
    );

    return { success: true, data: resultLead.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};


export { create, createCron };
