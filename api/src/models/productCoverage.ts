import pool from "../util/database";

const createProductCoverage: any = async (
  product_id: string,
  id: string,
  name: string,
  amount: string,
  maximum: string,
  lack: string,
  events: string
) => {
  try {
    const result = await pool.query(
      `
        INSERT  INTO app.productCoverage(
                  product_id,
                  id,
                  name,
                  amount,
                  maximum,
                  lack,
                  events) 
        VALUES (  $1,
                  $2,
                  $3,
                  $4,
                  $5,
                  $6,
                  $7) 
        RETURNING *`,
      [product_id, id, name, amount, maximum, lack, events]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const deleteProductCoverages: any = async (product_id: string) => {
  try {
    const result = await pool.query(
      "DELETE FROM app.productCoverage WHERE product_id = $1",
      [product_id]
    );
    return { success: true, data: true, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const listProductCoverages: any = async (product_id: string) => {
  try {
    const result = await pool.query(
      `
        SELECT  id,
                name,
                amount,
                maximum,
                lack,
                events
        FROM    app.productCoverage
        WHERE   product_id = $1 
        ORDER   BY 
                name`,
      [product_id]
    );
    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { createProductCoverage, deleteProductCoverages, listProductCoverages };
