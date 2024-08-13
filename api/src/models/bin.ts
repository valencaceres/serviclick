import pool from "../util/database";

const createBin = async (
  broker_id: string,
  holding: string,
  brand: string,
  bin: number,
  product: string,
  type: string
) => {
  try {
    const response = await pool.query(
      `
      INSERT INTO app.bin (broker_id, holding, brand, bin, product, type)
      VALUES ($1, $2, $3, $4, $5, $6) returning *
      `,
      [broker_id, holding, brand, bin, product, type]
    );

    return { success: true, data: response.rows[0], error: null };
  } catch (e: any) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getById = async (bin: number) => {
  try {
    const response = await pool.query("SELECT * FROM app.bin WHERE bin = $1", [
      bin,
    ]);

    if (response.rows.length === 0) {
      return { success: false, data: null, error: "No matching Bin found" };
    }

    return { success: true, data: response.rows[0], error: null };
  } catch (e: any) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { createBin, getById };
