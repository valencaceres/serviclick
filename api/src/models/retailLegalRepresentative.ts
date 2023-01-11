import pool from "../util/database";

const create: any = async (retail_id: string, rut: string, name: string) => {
  try {
    const query = `
        INSERT  INTO app.retaillegalrepresentative(
                retail_id,
                rut,
                name)
        VALUES( $1, $2, $3) RETURNING *`;

    const result = await pool.query(query, [retail_id, rut, name]);

    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const deleteByRetailId: any = async (retail_id: string) => {
  try {
    const query = `
        DELETE  FROM app.retaillegalrepresentative
        WHERE   retail_id = $1
        RETURNING *`;

    const result = await pool.query(query, [retail_id]);

    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create, deleteByRetailId };
