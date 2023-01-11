import moment from "moment";

import pool from "../util/database";

const create: any = async (
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

export { create };
