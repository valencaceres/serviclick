import pool from "../util/database";

const create: any = async (assistance_id: string, document_id: string) => {
  try {
    const result = await pool.query(
      "INSERT INTO app.assistancedocument(assistance_id, document_id) VALUES ($1, $2) RETURNING *",
      [assistance_id, document_id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const deleteByAssistanceId: any = async (id: string) => {
  try {
    const result = await pool.query(
      "DELETE FROM app.assistancedocument WHERE assistance_id = $1 RETURNING *",
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
       from   app.assistancedocument asi inner join app.document val on asi.document_id = val.id
       where  asi.assistance_id = $1
       order  by
              val.name`,
      [assistance_id]
    );

    console.log(result.rows);

    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create, deleteByAssistanceId, getByAssistanceId };
