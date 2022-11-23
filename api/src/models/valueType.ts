import pool from "../util/database";

const create: any = async (code: string, name: string, description: string) => {
  try {
    const result = await pool.query(
      "INSERT INTO app.valueType(code, name, description) VALUES ($1, $2, $3) RETURNING *",
      [code, name, description]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const updateById: any = async (
  id: string,
  code: string,
  name: string,
  description: string
) => {
  try {
    const result = await pool.query(
      "UPDATE app.valueType SET code = $2, name = $3, description = $4 WHERE id = $1 RETURNING *",
      [id, code, name, description]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getAll: any = async () => {
  try {
    const result = await pool.query(
      `SELECT   id,
                code,
                name,
                description
       FROM     app.valueType
       ORDER    BY 
                name`
    );

    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getById: any = async (id: string) => {
  try {
    const result = await pool.query(
      `SELECT     id,
                  code,
                  name,
                  description
         FROM     app.valueType
         WHERE    id = $1
         ORDER    BY 
                  name`,
      [id]
    );

    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create, updateById, getAll, getById };
