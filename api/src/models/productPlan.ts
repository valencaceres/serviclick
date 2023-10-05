import pool from "../util/database";

const createModel: any = async (
  id: string,
  agent_id: string,
  plan_id: number,
  type: string,
  baseprice: number,
  price: number,
  frequency: string,
  discount: any
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
                plan_id = $4,
                baseprice = $6,
                price = $7,
                frequency = $8,
                discount_type = $9,
                discount_percent = $10,
                discount_cicles = $11
        WHERE   agent_id = $1 AND
                type = $5 AND
                product_id = $3 RETURNING *`;
    } else {
      query = `
        INSERT  INTO app.productPlan(
                agent_id, 
                createdate, 
                product_id, 
                plan_id, 
                type, 
                baseprice, 
                price, 
                frequency, 
                discount_type, 
                discount_percent, 
                discount_cicles) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`;
    }

    const result = await pool.query(query, [
      agent_id,
      new Date().toISOString(),
      id,
      plan_id,
      type,
      baseprice,
      price,
      frequency,
      discount.type,
      discount.percent,
      discount.cicles,
    ]);

    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getByProductIdModel: any = async (
  product_id: string,
  agent_id: string
) => {
  try {
    const result = await pool.query(
      "SELECT id, createdate, plan_id, type, baseprice, price, frequency, discount_type, discount_percent, discount_cicles FROM app.productPlan WHERE product_id = $1 AND agent_id = $2",
      [product_id, agent_id]
    );
    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getProductById: any = async (id: string) => {
  try {
    const result = await pool.query(
      `
      select  pro.id,
              pro.family_id,
              pro.name,
              des.promotional,
              pro.cost,
              pro.issubject,
              pro.frequency,
              pro.term,
              pro.beneficiaries,
              pro.currency,
              pro.mininsuredcompanyprice,
              pro.dueday,
              pla.id as productplan_id,
              pla.createdate,
              pla.plan_id,
              pla.type as customer_type,
              pla.baseprice,
              pla.price,		
              pla.agent_id,
              pla.discount_type,
              pla.discount_percent,
              pla.discount_cicles,
              asi.id as assistance_id,
              asi.name as assistance_name,
              pas.amount,
              pas.currency,
              pas.maximum,
              pas.events,
              pas.lack
      from    app.productplan pla
                inner join app.product pro on pla.product_id = pro.id
                inner join app.productdescription des on pro.id = des.product_id
                inner join app.productassistance pas on pro.id = pas.product_id
                inner join app.assistance asi on pas.assistance_id = asi.id
      where 	pla.id = $1
      order 	by
              pas.number`,
      [id]
    );
    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getById: any = async (id: string) => {
  try {
    const result = await pool.query(
      ` SELECT	ppl.id,
                ppl.createdate,
                ppl.product_id,
                ppl.plan_id,
                ppl.type,
                ppl.price,
                ppl.frequency,
                ppl.agent_id,
                ppl.discount_type,
                ppl.discount_percent,
                ppl.discount_cicles,
                ppl.baseprice,
                pro.name,
                pro.currency
        FROM	  app.productplan ppl
                  inner join app.product pro on ppl.product_id = pro.id
        WHERE   ppl.id = $1`,
      [id]
    );

    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { createModel, getByProductIdModel, getProductById, getById };
