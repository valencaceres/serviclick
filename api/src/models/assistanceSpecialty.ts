import pool from "../util/database";

const create: any = async (assistance_id: string, specialty_id: string) => {
  try {
    const result = await pool.query(
      "INSERT INTO app.assistancespecialty(assistance_id, specialty_id) VALUES ($1, $2) RETURNING *",
      [assistance_id, specialty_id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const deleteByAssistanceId: any = async (id: string) => {
  try {
    const result = await pool.query(
      "DELETE FROM app.assistancespecialty WHERE assistance_id = $1 RETURNING *",
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
       from   app.assistancespecialty asi inner join app.specialty val on asi.specialty_id = val.id
       where  asi.assistance_id = $1
       order  by
              val.name`,
      [assistance_id]
    );

    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create, deleteByAssistanceId, getByAssistanceId };
