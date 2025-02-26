import pool from "../util/database";

const createModel: any = async (
  lead_id: string,
  product_id: string,
  price: number,
  currency_code: string,
  frequency_code: string,
  productPlan_id: number
) => {
  try {
    let data;

    const resultCustomer = await pool.query(
      `
      SELECT  lead_id,
              product_id,
              price,
              currency_code,
              frequency_code,
              productplan_id
      FROM    app.leadproduct
      WHERE   lead_id = $1
      AND     product_id = $2
      AND     productplan_id = $3`,
      [lead_id, product_id, productPlan_id]
    );
    data = resultCustomer.rows[0];

    if (resultCustomer.rows.length === 0) {
      const resulInsert = await pool.query(
        `
        INSERT  INTO app.leadproduct(
                lead_id,
                product_id,
                price,
                currency_code,
                frequency_code,
                productplan_id) 
        VALUES( $1, $2, $3, $4, $5, $6) RETURNING *`,
        [
          lead_id,
          product_id,
          price,
          currency_code,
          frequency_code,
          productPlan_id,
        ]
      );
      data = resulInsert.rows[0];

      return { success: true, data, error: null };
    }

    const resultUpdate = await pool.query(
      `
      UPDATE  app.leadproduct 
      SET     product_id = $1,
              price = $2,
              currency_code = $3,
              frequency_code = $4,
              productplan_id = $5
      WHERE   lead_id = $6 RETURNING *`,
      [
        product_id,
        price,
        currency_code,
        frequency_code,
        productPlan_id,
        lead_id,
      ]
    );

    return { success: true, data: resultUpdate.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getByLeadId: any = async (lead_id: string) => {
  try {
    const result = await pool.query(
      `
        SELECT  lpr.lead_id,
                lpr.product_id,
                lpr.price,
                lpr.currency_code,
                lpr.frequency_code,
                lpr.productplan_id,
                ppl.beneficiary_price
        FROM    app.leadproduct lpr
                  inner join app.productplan ppl on lpr.product_id = ppl.product_id and lpr.productplan_id = ppl.plan_id
        WHERE   lpr.lead_id = $1`,
      [lead_id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getProductByInsuredId: any = async (insured_id: string) => {
  try {
    const result = await pool.query(
      `
      select pro.id,
             MAX(lea.subscription_id) as subscription_id,
             MAX(fam.name) as family_name,
             MAX(fam.icon) as family_icon,
             MAX(pro.name) as name
      from 	 app.lead lea inner join app.leadproduct lpr on lea.id = lpr.lead_id
                          inner join app.leadinsured lin on lea.id = lin.lead_id
                          inner join app.product pro on lpr.product_id = pro.id
                          inner join app.family fam on pro.family_id = fam.id
                          inner join app.insured ins on lin.insured_id = ins.id
                          inner join app.subscription sus on lea.subscription_id = sus.subscription_id
      where  ins.id = $1 and
             sus.event = 'subscription_activated'
      group  by
             pro.id
      order  by
             MAX(fam.name),
             MAX(pro.name)`,
      [insured_id]
    );
    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { createModel, getByLeadId, getProductByInsuredId };
