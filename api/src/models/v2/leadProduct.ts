import pool from "../../util/database";

const createGatewayModel: any = async (
    lead_id: string,
    product_id: string,
    price: number,
    currency_code: string,
    frequency_code: string,
    plan_id: number
  ) => {
    try {
      let data;
      console.log(plan_id);
      const resultCustomer = await pool.query(
        `
  SELECT lead_id,
         product_id,
         price,
         currency_code,
         frequency_code,
         productplan_id,
         gsteway_productplan_id
  FROM   app.leadproduct
  WHERE  lead_id = $1
  AND    product_id = $2`,
        [lead_id, product_id]
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
                  gsteway_productplan_id) 
          VALUES( $1, $2, $3, $4, $5, $6) RETURNING *`,
          [
            lead_id,
            product_id,
            price,
            currency_code,
            frequency_code,
            plan_id,
          ]
        );
        data = resulInsert.rows[0];
  
        return { success: true, data, error: null };
      }
  
      const resultUpdate = await pool.query(
        `
        UPDATE  app.leadproduct 
        SET     price = $1,
                currency_code = $2,
                frequency_code = $3,
                gsteway_productplan_id = $4
        WHERE   lead_id = $5
        AND     product_id = $6
        RETURNING *`,
        [price, currency_code, frequency_code, plan_id, lead_id, product_id]
      );
  
      data = resultUpdate.rows[0];
      return { success: true, data, error: null };
    } catch (e) {
      return { success: false, data: null, error: (e as Error).message };
    }
  };
  
  const getByLeadIdGateway: any = async (lead_id: string) => {
    try {
      const result = await pool.query(
        `
          SELECT DISTINCT lpr.lead_id,
                  lpr.product_id,
                  lpr.price,
                  lpr.currency_code,
                  lpr.frequency_code,
                  lpr.productplan_id,
                  ppl.beneficiary_price
          FROM    app.leadproduct lpr
                        inner join app.productplan ppl on lpr.product_id = ppl.product_id 
                      inner join app.gateway_productplan gpt on ppl.id = gpt.productplan_id
          WHERE   lpr.lead_id =  $1`,
        [lead_id]
      );
      return { success: true, data: result.rows[0], error: null };
    } catch (e) {
      return { success: false, data: null, error: (e as Error).message };
    }
  };

export {createGatewayModel, getByLeadIdGateway}