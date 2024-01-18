import pool from "../util/database";

import { _getProcessById } from "../queries/agent";

const createAgent: any = async (channel_id: string, name: string) => {
  try {
    const result = await pool.query(
      "INSERT INTO app.agent(channel_id, name) VALUES ($1, $2) RETURNING *",
      [channel_id, name]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const updateAgent: any = async (
  id: string,
  channel_id: string,
  name: string
) => {
  try {
    const result = await pool.query(
      "UPDATE app.agent SET channel_id = $1, name = $2 WHERE id = $3 RETURNING *",
      [channel_id, name, id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const deleteAgent: any = async (id: string) => {
  try {
    const result = await pool.query(
      "UPDATE app.agent SET isActive = false WHERE id = $1 RETURNING *",
      [id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const listAgents: any = async (channel_id: string) => {
  try {
    const result = await pool.query(
      `SELECT id, channel_id, name FROM app.agent WHERE channel_id = $1 and isActive IS true ORDER BY name`,
      [channel_id]
    );
    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getProcessById: any = async (id: string) => {
  try {
    const result = await pool.query(_getProcessById, [id]);
    return { success: true, data: result.rows[0].process, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getById: any = async (id: string) => {
  try {
    const result = await pool.query(
      `SELECT id, channel_id, name, fantasyname FROM app.agent WHERE id = $1 and isActive IS true`,
      [id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
}

export { createAgent, updateAgent, deleteAgent, listAgents, getProcessById,getById };
