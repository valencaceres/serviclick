import pool from "../util/database";

const createFamily: any = async (name: string) => {
  try {
    const result = await pool.query(
      "INSERT INTO app.family(name) VALUES ($1) RETURNING *",
      [name]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const updateFamily: any = async (id: string, name: string) => {
  try {
    const result = await pool.query(
      "UPDATE app.family SET name = $1 WHERE id = $2 RETURNING *",
      [name, id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const deleteFamily: any = async (id: string) => {
  try {
    const result = await pool.query(
      "UPDATE app.family SET isActive = false WHERE id = $1 RETURNING *",
      [id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getFamily: any = async (family_id: string) => {
  try {
    const result = await pool.query(
      "SELECT id, name FROM app.family WHERE id = $1",
      [family_id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const listFamilies: any = async (values: any) => {
  try {
    const result = await pool.query(
      "SELECT id, name, icon FROM app.family ORDER BY name"
    );
    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { createFamily, updateFamily, deleteFamily, getFamily, listFamilies };
