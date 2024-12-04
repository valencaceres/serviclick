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

  const getProductGatewayById: any = async (
    productplan_id: string,
    collector_id: string
  ) => {
    try {
      const result = await pool.query(
        `
  select collector_plan_id
  from app.gateway_productplan
      where productplan_id = $1 AND collector_id = $2
  `,
        [productplan_id, collector_id]
      );
      return { success: true, data: result.rows[0], error: null };
    } catch (e) {
      return { success: false, data: null, error: (e as Error).message };
    }
  };

  const getPlanByIdAndBrokerId: any = async (
    broker_id: string,
    product_plan_id: string
  ) => {
    try {
      const result = await pool.query(
        `
  SELECT DISTINCT 
      COALESCE(gp1.collector_plan_id, gp2.collector_plan_id, gp3.collector_plan_id) as plan_id,
      COALESCE(gp1.collector_id, gp2.collector_id, gp3.collector_id) as collector_id,
      COALESCE(gc1.alias, gc2.alias, gc3.alias) as alias
  FROM app.brokerproduct bp
  LEFT JOIN app.gateway_productplan gp1 ON bp.gateway_customer_plan_id::uuid = gp1.productplan_id
  LEFT JOIN app.gateway_productplan gp2 ON bp.gateway_company_plan_id::uuid = gp2.productplan_id
  LEFT JOIN app.gateway_productplan gp3 ON bp.gateway_yearly_plan_id::uuid = gp3.productplan_id
  LEFT join app.gateway_collector gc1 on gp1.collector_id = gc1.id 
  LEFT join app.gateway_collector gc2 on gp2.collector_id = gc2.id
  LEFT join app.gateway_collector gc3 on gp3.collector_id = gc3.id
  WHERE bp.broker_id = $1
    AND (
        bp.gateway_customer_plan_id = $2
        OR bp.gateway_company_plan_id = $2
        OR bp.gateway_yearly_plan_id = $2
    );
  `,
        [broker_id, product_plan_id]
      );
      return { success: true, data: result.rows, error: null };
    } catch (e) {
      return { success: false, data: null, error: (e as Error).message };
    }
  };

  export {
    createProductPlanGateway,
    Gateway,
    getCollectorByAlias,
    getProductGatewayById,
    getPlanByIdAndBrokerId,
  }