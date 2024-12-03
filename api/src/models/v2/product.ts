import pool from "../../util/database";

const createProductPlanGateway: any = async (
    id: string,
    agent_id: string,
    type: string,
    baseprice: number,
    price: number,
    frequency: string,
    discount: any,
    beneficiary_price: number
  ) => {
    try {
      const resultProductPlan = await pool.query(
        "SELECT 1 FROM app.productPlan WHERE agent_id = $1 AND type = $2 AND product_id = $3",
        [agent_id, type, id]
      );
      let query: string;
  
      if (resultProductPlan.rows.length > 0) {
        query = `
          UPDATE  app.productPlan
          SET     createdate = $2,
                  baseprice = $5,
                  price = $6,
                  frequency = $7,
                  discount_type = $8,
                  discount_percent = $9,
                  discount_cicles = $10,
                  beneficiary_price = $11
          WHERE   agent_id = $1 AND
                  type = $4 AND
                  product_id = $3 RETURNING *`;
      } else {
        query = `
          INSERT  INTO app.productPlan(
                  agent_id, 
                  createdate, 
                  product_id, 
                  type, 
                  baseprice, 
                  price, 
                  frequency, 
                  discount_type, 
                  discount_percent, 
                  discount_cicles,
                  beneficiary_price) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`;
      }
      const result = await pool.query(query, [
        agent_id,
        new Date().toISOString(),
        id,
        type,
        baseprice,
        price,
        frequency,
        discount.type,
        discount.percent,
        discount.cicles,
        beneficiary_price,
      ]);
  
      return { success: true, data: result.rows[0], error: null };
    } catch (e) {
      return { success: false, data: null, error: (e as Error).message };
    }
  };
  
  const Gateway: any = async (
    collector_planid: string,
    collector_id: string,
    productplan_id: string
  ) => {
    try {
      const response = await pool.query(
        `
        INSERT INTO app.gateway_productplan
        (collector_plan_id,
        collector_id,
        productplan_id)
        VALUES ($1, $2, $3)
        `,
        [collector_planid, collector_id, productplan_id]
      );
      return { success: true, data: response.rows, error: null };
    } catch (e: any) {}
  };
  
  const getCollectorByAlias = async (alias: string) => {
    try {
      const response = await pool.query(
        `select id, alias from app.gateway_collector where alias = $1`,
        [alias]
      );
      if (response) {
        return { success: true, data: response.rows[0], error: null };
      }
    } catch (e) {
      return { success: false, data: null, error: (e as Error).message };
    }
  };

  export {Gateway, createProductPlanGateway}