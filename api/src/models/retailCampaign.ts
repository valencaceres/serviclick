import pool from "../util/database";

const create: any = async (retail_id: string, name: string) => {
  try {
    const arrayValues = [retail_id, name];

    const resultRetail = await pool.query(
      "SELECT id, retail_id, name FROM app.retailcampaign WHERE retail_id = $1 AND name = $2",
      arrayValues
    );

    let query: string;
    let data: any;

    if (resultRetail.rows.length > 0) {
      data = {
        id: resultRetail.rows[0].id,
        retail_id: resultRetail.rows[0].retail_id,
        name: resultRetail.rows[0].name,
      };
    } else {
      query = `
        INSERT  INTO app.retailcampaign(
                retail_id,
                name)
        VALUES( $1, $2) RETURNING *`;

      const result = await pool.query(query, arrayValues);
      data = {
        id: result.rows[0].id,
        retail_id: result.rows[0].retail_id,
        name: result.rows[0].name,
      };
    }

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create };
