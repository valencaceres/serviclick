import pool from "../util/database";

const create: any = async (
  assistance_id: string,
  value_id: string,
  line_order: number
) => {
  try {
    const result = await pool.query(
      "INSERT INTO app.assistancevalue(assistance_id, value_id, line_order) VALUES ($1, $2, $3) RETURNING *",
      [assistance_id, value_id, line_order]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const deleteByAssistanceId: any = async (id: string) => {
  try {
    const result = await pool.query(
      "DELETE FROM app.assistancevalue WHERE assistance_id = $1 RETURNING *",
      [id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getByAssistanceId: any = async (assistance_id: string) => {
  try {
    const result = await pool.query(
      `select val.id,
              val.name
       from   app.assistancevalue asi inner join app.value val on asi.value_id = val.id
       where  asi.assistance_id = $1
       order  by
              asi.line_order`,
      [assistance_id]
    );

    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create, deleteByAssistanceId, getByAssistanceId };
