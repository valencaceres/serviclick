import pool from "../util/database";

const createProductCoverage: any = async (
  product_id: string,
  id: string,
  name: string,
  amount: string,
  maximum: string,
  lack: string,
  events: string,
  isCombined: boolean
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
                  events,
                  iscombined) 
        VALUES (  $1,
                  $2,
                  $3,
                  $4,
                  $5,
                  $6,
                  $7,
                  $8) 
        RETURNING *`,
      [product_id, id, name, amount, maximum, lack, events, isCombined]
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
                events,
                iscombined
        FROM    app.productCoverage
        WHERE   product_id = $1 
        ORDER   BY 
                name`,
      [product_id]
    );

    const data = result.rows.map((row) => {
      return {
        id: row.id,
        name: row.name,
        amount: row.amount,
        maximum: row.maximum,
        lack: row.lack,
        events: row.events,
        isCombined: row.iscombined,
      };
    });
    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { createProductCoverage, deleteProductCoverages, listProductCoverages };
