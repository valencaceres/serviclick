import pool from "../util/database";

import { _getProcessById } from "../queries/agent";

const createAgent: any = async (channel_id: string, name: string) => {
  try {
    const result = await pool.query(
      "INSERT INTO app.agent(channel_id, name) VALUES ($1, $2) RETURNING *",
      [channel_id, name]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const updateAgent: any = async (
  id: string,
  channel_id: string,
  name: string
) => {
  try {
    const result = await pool.query(
      "UPDATE app.agent SET channel_id = $1, name = $2 WHERE id = $3 RETURNING *",
      [channel_id, name, id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const deleteAgent: any = async (id: string) => {
  try {
    const result = await pool.query(
      "UPDATE app.agent SET isActive = false WHERE id = $1 RETURNING *",
      [id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const listAgents: any = async (channel_id: string) => {
  try {
    const result = await pool.query(
      `SELECT id, channel_id, name FROM app.agent WHERE channel_id = $1 and isActive IS true ORDER BY name`,
      [channel_id]
    );
    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getProcessById: any = async (id: string) => {
  try {
    const result = await pool.query(_getProcessById, [id]);
    return { success: true, data: result.rows[0].process, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getById: any = async (id: string) => {
  try {
    const result = await pool.query(
      `SELECT id, channel_id, name, fantasyname FROM app.agent WHERE id = $1 and isActive IS true`,
      [id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
}


const getProductsByAgentId: any = async (agent_id: string) => {
  try {
    const result = await pool.query(
      `
      SELECT  brp.product_id,
      pro.name,
      pro.beneficiaries,
      des.promotional,
      plp.baseprice,
      plp.price as customerprice,
      plc.price as companyprice,
      ply.price as yearlyprice,
      plp.beneficiary_price as beneficiary_price,
      brp.commisiontype_code,
      brp.value,
      brp.currency,
      plp.id as productplan_customer_id,
      plc.id as productplan_company_id,
      ply.id as productplan_yearly_id,
      plp.discount_type,
      plp.discount_percent,
      plp.discount_cicles,
      plp.plan_id as customer_plan_id,
      plc.plan_id as company_plan_id,
      ply.plan_id as yearly_plan_id,
      plf.base64 as pdfBase64
FROM  app.agentproduct brp
        inner join app.product pro on brp.product_id = pro.id
        left outer join app.productdescription des on pro.id = des.product_id
        left outer join app.productplan plp on plp.product_id = pro.id and plp.plan_id = brp.customer_plan_id
        left outer join app.productplan plc on plc.product_id = pro.id and plc.plan_id = brp.company_plan_id
        left outer join app.productplan ply on ply.product_id = pro.id and ply.plan_id = brp.yearly_plan_id
        left outer join  app.productplanpdf plf ON (ply.id = plf.productplan_id OR plp.id = plf.productplan_id)
      
        WHERE brp.agent_id = $1 and
      brp.isactive is true
ORDER BY
      brp.number,
      pro.name`,
      [agent_id]
  );
    const data = result.rows.map((row) => {
      const {
        product_id,
        name,
        beneficiaries,
        promotional,
        baseprice,
        customerprice,
        yearlyprice,
        commisiontype_code,
        value,
        currency,
        yearly_plan_id,
        customer_plan_id,
        discount_type,
        discount_percent,
        discount_cicles,
        beneficiary_price,
        pdfbase64,
      } = row;
      return {
        product_id,
        name,
        beneficiaries,
        promotional,
        beneficiary_price,
        productPlan_id: {
          customer: customer_plan_id,
          yearly:  yearly_plan_id,
        },
        price: {
          base: baseprice,
          customer: customerprice,
          yearly: yearlyprice
        },
        commisionTypeCode: commisiontype_code,
        value,
        currency,
        discount: {
          type: discount_type,
          percent: discount_percent,
          cicles: discount_cicles,
        },
        pdfbase64,
      };
    });
    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const postAgentProductPlan = async (agent_id: string) => {
  try {
      const getProductsPlansByAgent = await pool.query(
          `SELECT  
              pro.id AS product_id,
              pro.name,
              pro.beneficiaries,
              des.promotional,
              plp.discount_type,
              plp.discount_percent,
              plp.discount_cicles,
              plp.baseprice,
              plp.price AS customerprice,
              plp.beneficiary_price AS beneficiary_price,
              plp.plan_id AS customer_plan_id,
              plp.type AS product_type
          FROM  
              app.product pro
              LEFT OUTER JOIN app.productdescription des ON pro.id = des.product_id
              INNER JOIN app.productplan plp ON pro.id = plp.product_id
              INNER JOIN app.agent age ON plp.agent_id = age.id
          WHERE
              (age.id::TEXT = $1 OR age.fantasyname = $1)
              AND (plp.type = 'customer' OR plp.type = 'yearly')
          ORDER BY
              pro.name`,
          [agent_id]
      );
      const productsPlans = getProductsPlansByAgent.rows;
      console.log(productsPlans, "prodd")
      for (const productPlan of productsPlans) {
          const {
              product_id,
              customerprice,
              baseprice,
              customer_plan_id,
              product_type,
          } = productPlan;

          let companyprice;
          let company_plan_id;
          let yearlyprice;
          let yearly_plan_id;
          if (product_type === 'company') {
              companyprice = customerprice;
              company_plan_id = customer_plan_id;
          }
          if (product_type === 'yearly') {
              yearlyprice = customerprice;
              yearly_plan_id = customer_plan_id;
          }

       const result =    await pool.query(
              `INSERT INTO app.agentproduct (
                  agent_id,
                  product_id,
                  customerprice,
                  companyprice,
                  commisiontype_code,
                  value,
                  currency,
                  isactive,
                  customer_plan_id,
                  company_plan_id,
                  baseprice,
                  number,
                  yearlyprice,
                  yearly_plan_id
              ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
              [
                  agent_id,
                  product_id,
                  customerprice,
                  companyprice,
                  null, 
                  null,
                  'P', 
                  true, 
                  customer_plan_id,
                  company_plan_id,
                  baseprice,
                  0, 
                  yearlyprice,
                  yearly_plan_id
              ]
          );
          console.log(result.rows[0], "resyukt")
      }
      return { success: true, data: null, error: null };
  } catch (error) {
      return { success: false, data: null, error: (error as Error).message };
  }
};

const addProduct = async (
  agent_id: string,
  product_id: string,
  customer_plan_id: string | null,
  company_plan_id: string | null,
  yearly_plan_id: string | null,
  price: any
) => {

  const arrayValues = [
    agent_id,
    product_id,
    customer_plan_id,
    company_plan_id,
    yearly_plan_id,
    price.base || 0,
    price.customer || 0,
    price.company || 0 ,
    price.yearlyprice || 0,
   
  ];

  try {
    const arrayValues = [
      agent_id,
      product_id,
      customer_plan_id,
      company_plan_id,
      yearly_plan_id,
      price.base || 0,
      price.customer || 0,
      price.company || 0 ,
      price.yearlyprice || 0,
    ];


    const resultAgentProduct = await pool.query(
      "SELECT 1 FROM app.agentproduct WHERE agent_id = $1 AND product_id = $2",
      [agent_id, product_id]
    );

    let query: string;

    if (resultAgentProduct.rows.length > 0) {
      query = `
        UPDATE  app.agentproduct
        SET     customer_plan_id = $3,
                company_plan_id = $4,
                yearly_plan_id = $5,
                baseprice = $6,
                customerprice = $7,
                companyprice = $8,
                yearlyprice = $9
        WHERE   agent_id = $1 AND
                product_id = $2 RETURNING *`;
    } else {
      query = `
        INSERT  INTO app.agentproduct(
                agent_id,
                product_id,
                customer_plan_id,
                company_plan_id,
                yearly_plan_id,
                baseprice,
                customerprice,
                companyprice,
                yearlyprice
               )
        VALUES( $1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
    }

    const result = await pool.query(query, arrayValues);

    const data = {
      agent_id: result.rows[0].agent_id,
      product_id: result.rows[0].product_id,
      price: {
        customer: {
          base: result.rows[0].baseprice,
          price: result.rows[0].customerprice,
          plan_id: result.rows[0].customer_plan_id,
        },
        company: {
          price: result.rows[0].companyprice,
          plan_id: result.rows[0].company_plan_id,
        },
        yearly:{
          price: result.rows[0].yearlyprice,
          plan_id: result.rows[0].yearly_plan_id
        }
      },
     
    };

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};


export { createAgent, updateAgent, deleteAgent, listAgents, getProcessById,getById , getProductsByAgentId, postAgentProductPlan, addProduct};
