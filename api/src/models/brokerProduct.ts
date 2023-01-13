import createLogger from "../util/logger";
import pool from "../util/database";

const create: any = async (
  broker_id: string,
  product_id: string,
  customer_plan_id: number,
  company_plan_id: number,
  price: any,
  commisionTypeCode: string,
  value: number,
  currency: string
) => {
  try {
    const arrayValues = [
      broker_id,
      product_id,
      customer_plan_id,
      company_plan_id,
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
                    customer_plan_id,
                    company_plan_id,
                    customerprice,
                    companyprice,
                    commisiontype_code,
                    value,
                    currency)
            VALUES( $1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
    const result = await pool.query(query, arrayValues);

    const data = {
      broker_id: result.rows[0].broker_id,
      product_id: result.rows[0].product_id,
      price: {
        customer: {
          price: result.rows[0].customerprice,
          plan_id: result.rows[0].customer_plan_id,
        },
        company: {
          price: result.rows[0].companyprice,
          plan_id: result.rows[0].company_plan_id,
        },
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
              des.promotional,
              brp.customerprice,
              brp.companyprice,
              brp.commisiontype_code,
              brp.value,
              brp.currency,
              plp.discount_type,
              plp.discount_percent,
              plp.discount_cicles,
              plp.plan_id as customer_plan_id,
              plc.plan_id as company_plan_id
        FROM  app.brokerProduct brp
                inner join app.product pro on brp.product_id = pro.id
                left outer join app.productdescription des on pro.id = des.product_id
                left outer join app.productplan plp on plp.product_id = pro.id and plp.plan_id = brp.customer_plan_id
                left outer join app.productplan plc on plc.product_id = pro.id and plc.plan_id = brp.company_plan_id
        WHERE brp.broker_id = $1 and
              brp.isactive is true
        ORDER BY
              pro.name`,
      [broker_id]
    );

    const data = result.rows.map((row) => {
      const {
        product_id,
        name,
        promotional,
        customerprice,
        companyprice,
        commisiontype_code,
        value,
        currency,
        discount_type,
        discount_percent,
        discount_cicles,
      } = row;
      return {
        product_id,
        name,
        promotional,
        price: { customer: customerprice, company: companyprice },
        commisionTypeCode: commisiontype_code,
        value,
        currency,
        discount: {
          type: discount_type,
          percent: discount_percent,
          cicles: discount_cicles,
        },
      };
    });

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create, deleteByBrokerId, getByBrokerId };
