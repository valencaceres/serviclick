import createLogger from "../util/logger";
import pool from "../util/database";

const create: any = async (
  broker_id: string,
  product_id: string,
  price: any,
  commisionTypeCode: string,
  value: number,
  currency: string
) => {
  try {
    const arrayValues = [
      broker_id,
      product_id,
      price.customer,
      price.company,
      commisionTypeCode,
      value,
      currency,
    ];

    const query: string = `
            INSERT  INTO app.brokerProduct(
                    broker_id,
                    product_id,
                    customerprice,
                    companyprice,
                    commisiontype_code,
                    value,
                    currency)
            VALUES( $1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    const result = await pool.query(query, arrayValues);

    const data = {
      broker_id: result.rows[0].broker_id,
      product_id: result.rows[0].product_id,
      price: {
        customer: result.rows[0].customerprice,
        company: result.rows[0].companyprice,
      },
      commisionTypeCode: result.rows[0].commisiontype_code,
      value: result.rows[0].value,
      currency: result.rows[0].currency,
    };

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const deleteByBrokerId: any = async (broker_id: string) => {
  try {
    const result = await pool.query(
      `DELETE FROM app.brokerProduct WHERE broker_id = $1`,
      [broker_id]
    );

    return { success: true, data: "OK", error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getByBrokerId: any = async (broker_id: string) => {
  try {
    const result = await pool.query(
      `
        SELECT  brp.product_id,
                pro.name,
                brp.customerprice,
                brp.companyprice,
                brp.commisiontype_code,
                brp.value,
                brp.currency
        FROM    app.brokerProduct brp inner join app.product pro on brp.product_id = pro.id
        WHERE   brp.broker_id = $1 and  brp.isactive is true
        ORDER   BY
                pro.name`,
      [broker_id]
    );

    const data = result.rows.map((row) => {
      const {
        product_id,
        name,
        customerprice,
        companyprice,
        commisiontype_code,
        value,
        currency,
      } = row;
      return {
        product_id,
        name,
        price: { customer: customerprice, company: companyprice },
        commisionTypeCode: commisiontype_code,
        value,
        currency,
      };
    });

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create, deleteByBrokerId, getByBrokerId };
