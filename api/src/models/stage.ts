import pool from "../util/database";

const createStage: any = async (name: string) => {
  try {
    const result = await pool.query(
      "INSERT INTO app.stage(name) VALUES ($1) RETURNING *",
      [name]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const updateStage: any = async (id: string, name: string) => {
  try {
    const result = await pool.query(
      "UPDATE app.stage SET name = $1 WHERE id = $2 RETURNING *",
      [name, id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const deleteStage: any = async (id: string) => {
  try {
    const result = await pool.query(
      "UPDATE app.stage SET isActive = false WHERE id = $1 RETURNING *",
      [id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getStage: any = async (stage_id: string) => {
  try {
    const result = await pool.query(
      "SELECT id, name FROM app.stage WHERE id = $1",
      [stage_id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getAllStages: any = async (values: any) => {
  try {
    const result = await pool.query(
      "SELECT id, name FROM app.stage WHERE isactive is true ORDER BY number"
    );
    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { createStage, updateStage, deleteStage, getStage, getAllStages };
