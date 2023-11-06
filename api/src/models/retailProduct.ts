import createLogger from "../util/logger";
import pool from "../util/database";

const create: any = async (
  retail_id: string,
  product_id: string,
  plan_id: number,
  normalPrice: number,
  price: number,
  currency: string,
  number: number
) => {
  try {
    const arrayValues = [
      retail_id,
      product_id,
      plan_id,
      normalPrice,
      price,
      currency,
      number,
    ];

    const resultRetailProduct = await pool.query(
      "SELECT 1 FROM app.retailProduct WHERE retail_id = $1 AND product_id = $2",
      [retail_id, product_id]
    );

    let query: string;

    if (resultRetailProduct.rows.length > 0) {
      query = `
        UPDATE  app.retailProduct
        SET     plan_id = $3,
                normalprice = $4,
                companyprice = $5,
                currency = $6,
                number = $7
        WHERE   retail_id = $1 AND
                product_id = $2 RETURNING *`;
    } else {
      query = `
        INSERT  INTO app.retailProduct(
                retail_id,
                product_id,
                plan_id,
                normalprice,
                companyprice,
                currency,
                number)
        VALUES( $1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    }

    const result = await pool.query(query, arrayValues);

    const data = {
      retail_id: result.rows[0].retail_id,
      product_id: result.rows[0].product_id,
      plan_id: result.rows[0].plan_id,
      normalprice: result.rows[0].normalprice,
      price: result.rows[0].companyprice,
      currency: result.rows[0].currency,
      number: result.rows[0].number,
    };

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

// const deleteByRetailId: any = async (retail_id: string) => {
//   try {
//     const result = await pool.query(
//       `UPDATE app.retailProduct SET isactive = false WHERE retail_id = $1`,
//       [retail_id]
//     );

//     return { success: true, data: "OK", error: null };
//   } catch (e) {
//     return { success: false, data: null, error: (e as Error).message };
//   }
// };

const removeByProductId: any = async (
  retail_id: string,
  product_id: string
) => {
  try {
    const result = await pool.query(
      `UPDATE app.retailproduct SET isactive = false WHERE retail_id = $1 AND product_id = $2`,
      [retail_id, product_id]
    );

    return { success: true, data: "OK", error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getByRetailId: any = async (retail_id: string) => {
  try {
    const result = await pool.query(
      `SELECT brp.product_id,
              max(brp.number) as number,
              max(pro.name) as name,
              max(pro.beneficiaries) as beneficiaries,
              max(des.promotional) as promotional,
              max(ppl.baseprice) as baseprice,
              max(ppl.price) as price,
              max(ppl.frequency) as frequency,
              max(brp.currency) as currency,
              max(ppl.id :: text) as productplan_id,
              max(ppl.discount_type) as discount_type,
              max(ppl.discount_percent) as discount_percent,
              max(ppl.discount_cicles) as discount_cicles,
              max(ppl.plan_id) as plan_id,
              sum(case when pol.id is null then 0 else 1 end) as subscriptions
       FROM   app.retailProduct brp
                inner join app.product pro on brp.product_id = pro.id
                left outer join app.productdescription des on pro.id = des.product_id
                left outer join app.productplan ppl on pro.id = ppl.product_id and brp.plan_id = ppl.plan_id
                left outer join app.leadproduct lpr on ppl.plan_id = lpr.productplan_id
                left outer join app.lead lea on lpr.lead_id = lea.id
                left outer join app.policy pol on lea.policy_id = pol.id and (pol.enddate is null or pol.enddate::date >= now()::date)
       WHERE  brp.retail_id = $1 and
              brp.isactive is true
       GROUP  BY
              brp.product_id
       ORDER  BY
              max(brp.number),
              max(pro.name)`,
      [retail_id]
    );

    const data = result.rows.map((row) => {
      const {
        product_id,
        name,
        beneficiaries,
        promotional,
        baseprice,
        price,
        currency,
        frequency,
        productplan_id,
        discount_type,
        discount_percent,
        discount_cicles,
        plan_id,
        subscriptions,
      } = row;

      return {
        product_id,
        name,
        beneficiaries,
        promotional,
        baseprice,
        price,
        currency,
        frequency,
        productplan_id,
        plan_id,
        discount: {
          type: discount_type,
          percent: discount_percent,
          cicles: discount_cicles,
        },
        subscriptions,
      };
    });

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create, removeByProductId, getByRetailId };
