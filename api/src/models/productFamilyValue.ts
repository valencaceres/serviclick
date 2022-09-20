import pool from "../util/database";

const createProductFamilyValue: any = async (
  product_id: string,
  familyValue_id: string,
  name: string
) => {
  try {
    const result = await pool.query(
      `
        INSERT  INTO app.productFamilyValue(
                  product_id,
                  familyvalue_id,
                  name) 
        VALUES (  $1,
                  $2,
                  $3) 
        RETURNING *`,
      [product_id, familyValue_id, name]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const deleteProductFamilyValues: any = async (product_id: string) => {
  try {
    const result = await pool.query(
      "DELETE FROM app.productFamilyValue WHERE product_id = $1",
      [product_id]
    );
    return { success: true, data: true, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const listProductFamilyValues: any = async (product_id: string) => {
  try {
    const result = await pool.query(
      `
        SELECT  familyValue_id,
                name
        FROM    app.productFamilyValue
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

export {
  createProductFamilyValue,
  deleteProductFamilyValues,
  listProductFamilyValues,
};
