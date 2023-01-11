import pool from "../util/database";

const getByCode: any = async (code: string) => {
  try {
    const result = await pool.query(
      "SELECT id, channel_code, agent_id FROM app.slug WHERE code = $1",
      [code]
    );
    return {
      success: true,
      data: result.rows.length > 0 ? result.rows[0] : {},
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { getByCode };
