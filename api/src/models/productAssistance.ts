import pool from "../util/database";

const create: any = async (
  product_id: string,
  assistance_id: string,
  number: number,
  amount: number,
  maximum: string,
  events: number,
  lack: number,
  currency: string
) => {
  try {
    const arrayValues = [
      product_id,
      assistance_id,
      number,
      amount,
      maximum,
      events,
      lack,
      currency,
    ];

    const resultProductAssistance = await pool.query(
      "SELECT id FROM app.productassistance WHERE product_id = $1 and assistance_id = $2",
      [product_id, assistance_id]
    );

    let query: string;
    if (resultProductAssistance.rows.length > 0) {
      query =
        "UPDATE app.productassistance SET number = $3, amount = $4, maximum = $5, events = $6, lack = $7, currency = $8 WHERE product_id = $1 and assistance_id = $2 RETURNING *";
    } else {
      query =
        "INSERT INTO app.productassistance(product_id, assistance_id, number, amount, maximum, events, lack, currency) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";
    }

    const result = await pool.query(query, arrayValues);
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create };
