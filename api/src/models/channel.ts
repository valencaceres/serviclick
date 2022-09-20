import pool from "../util/database";

const createChannel: any = async (name: string, isBroker: boolean) => {
  try {
    const result = await pool.query(
      "INSERT INTO app.channel(name, isBroker) VALUES ($1, $2) RETURNING *",
      [name, isBroker]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const updateChannel: any = async (
  id: string,
  name: string,
  isBroker: boolean
) => {
  try {
    const result = await pool.query(
      "UPDATE app.channel SET name = $1, isBroker = $2 WHERE id = $3 RETURNING *",
      [name, isBroker, id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const deleteChannel: any = async (id: string) => {
  try {
    const result = await pool.query(
      "UPDATE app.channel SET isActive = false WHERE id = $1 RETURNING *",
      [id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const listChannels: any = async (values: any) => {
  try {
    const result = await pool.query(
      "SELECT id, name, isBroker FROM app.channel WHERE isActive IS true ORDER BY name"
    );
    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { createChannel, updateChannel, deleteChannel, listChannels };
