import pool from "../util/database";

const createProduct: any = async (
  family_id: string,
  name: string,
  cost: number,
  issubject: boolean,
  frequency: string,
  term: string,
  beneficiaries: number,
  minInsuredCompanyPrice: number,
  dueDay: number,
  currency: string
) => {
  try {
    const result = await pool.query(
      `
        INSERT  INTO app.product(
                  family_id,
                  name,
                  cost,
                  issubject,
                  frequency,
                  term,
                  beneficiaries,
                  mininsuredcompanyprice,
                  dueday,
                  currency) 
        VALUES (  $1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
        RETURNING *`,
      [
        family_id,
        name,
        cost,
        issubject,
        frequency,
        term,
        beneficiaries,
        minInsuredCompanyPrice,
        dueDay,
        currency,
      ]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const updateProduct: any = async (
  id: string,
  family_id: string,
  name: string,
  cost: number,
  isSubject: boolean,
  frequency: string,
  term: string,
  beneficiaries: number,
  minInsuredCompanyPrice: number,
  dueDay: number,
  currency: string
) => {
  try {
    const result = await pool.query(
      `
        UPDATE    app.product 
        SET       family_id = $1, 
                  name = $2,
                  cost = $3,
                  issubject = $4,
                  frequency = $5,
                  term = $6,
                  beneficiaries = $7,
                  mininsuredcompanyprice = $8,
                  dueday = $9,
                  currency = $10
        WHERE     id = $11
        RETURNING *`,
      [
        family_id,
        name,
        cost,
        isSubject,
        frequency,
        term,
        beneficiaries,
        minInsuredCompanyPrice,
        dueDay,
        currency,
        id,
      ]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const deleteProduct: any = async (id: string) => {
  try {
    const result = await pool.query(
      "UPDATE app.product SET isActive = false WHERE id = $1 RETURNING *",
      [id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const deletePlans: any = async (id: string, agent_id: string) => {
  try {
    const result = await pool.query(
      "DELETE FROM app.productplan WHERE product_id = $1 and agent_id = $2",
      [id, agent_id]
    );
    return { success: true, data: "Plans deleted", error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getProduct: any = async (id: string, agent_id: string) => {
  try {
    const result = await pool.query(
      `
          SELECT    pro.id,
                    MAX(pro.family_id :: text) as family_id, 
                    MAX(fam.name) as family_name,
                    MAX(pro.name) as name, 
                    MAX(pro.cost) as cost, 
                    MAX(case when pla.type = 'customer' then pla.price else 0 end) as customerprice, 
                    MAX(case when pla.type = 'company' then pla.price else 0 end) as companyprice, 
                    MAX(pro.issubject :: text) ::boolean as issubject, 
                    MAX(pro.frequency) as frequency, 
                    MAX(pro.term) as term,
                    MAX(pro.beneficiaries) as beneficiaries,
                    MAX(CASE WHEN pro.mininsuredcompanyprice IS NULL THEN 0 ELSE pro.mininsuredcompanyprice END) as mininsuredcompanyprice,
                    MAX(CASE WHEN pro.dueday IS NULL THEN 0 ELSE pro.dueday END) as dueday,
                    MAX(pro.currency) as currency,
                    SUM(case when pla.type = 'customer' then pla.price else 0 end) as customer_plan_price, 
                    SUM(case when pla.type = 'company' then pla.price else 0 end) as company_plan_price,
                    SUM(case when pla.type = 'customer' then pla.plan_id else 0 end) as customer_plan_id, 
                    SUM(case when pla.type = 'company' then pla.plan_id else 0 end) as company_plan_id
          FROM      app.product pro inner join app.family fam on pro.family_id = fam.id
                                    left outer join app.productplan pla on pro.id = pla.product_id and pla.agent_id = $2
          WHERE     pro.id = $1
          GROUP     BY
                    pro.id`,
      [id, agent_id]
    );

    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const listProducts: any = async (agent_id: string) => {
  try {
    const result = await pool.query(
      `
          SELECT  pro.id,
                  MAX(pro.family_id :: text) as family_id, 
                  MAX(fam.name) as family_name,
                  MAX(pro.name) as name, 
                  MAX(pro.cost) as cost, 
                  MAX(case when pla.type = 'customer' then pla.price else 0 end) as customerprice, 
                  MAX(case when pla.type = 'company' then pla.price else 0 end) as companyprice, 
                  MAX(pro.issubject :: text) ::boolean as issubject, 
                  MAX(pro.frequency) as frequency, 
                  MAX(pro.term) as term,
                  MAX(pro.beneficiaries) as beneficiaries,
                  MAX(CASE WHEN pro.mininsuredcompanyprice IS NULL THEN 0 ELSE pro.mininsuredcompanyprice END) as mininsuredcompanyprice,
                  MAX(CASE WHEN pro.dueday IS NULL THEN 0 ELSE pro.dueday END) as dueday,
                  MAX(pro.currency) as currency,
                  SUM(case when pla.type = 'customer' then pla.price else 0 end) as customer_plan_price, 
                  SUM(case when pla.type = 'company' then pla.price else 0 end) as company_plan_price,
                  SUM(case when pla.type = 'customer' then pla.plan_id else 0 end) as customer_plan_id, 
                  SUM(case when pla.type = 'company' then pla.plan_id else 0 end) as company_plan_id
          FROM    app.product pro inner join app.family fam on pro.family_id = fam.id
                                  left outer join app.productplan pla on pro.id = pla.product_id and pla.agent_id = $1
          WHERE   pro.isActive IS true
          GROUP   BY
                  pro.id
          ORDER   BY 
                  pro.name`,
      [agent_id]
    );

    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getProductByFamilyId: any = async (
  family_id: string,
  agent_id: string
) => {
  try {
    const result = await pool.query(
      `
          SELECT  pro.id,
                  MAX(pro.family_id :: text) as family_id, 
                  MAX(fam.name) as family_name,
                  MAX(pro.name) as name, 
                  MAX(pro.cost) as cost, 
                  MAX(case when pla.type = 'customer' then pla.price else 0 end) as customerprice, 
                  MAX(case when pla.type = 'company' then pla.price else 0 end) as companyprice, 
                  MAX(pro.issubject :: text) ::boolean as issubject, 
                  MAX(pro.frequency) as frequency, 
                  MAX(pro.term) as term,
                  MAX(pro.beneficiaries) as beneficiaries,
                  MAX(CASE WHEN pro.mininsuredcompanyprice IS NULL THEN 0 ELSE pro.mininsuredcompanyprice END) as mininsuredcompanyprice,
                  MAX(CASE WHEN pro.dueday IS NULL THEN 0 ELSE pro.dueday END) as dueday,
                  MAX(pro.currency) as currency,
                  SUM(case when pla.type = 'customer' then pla.price else 0 end) as customer_plan_price, 
                  SUM(case when pla.type = 'company' then pla.price else 0 end) as company_plan_price,
                  SUM(case when pla.type = 'customer' then pla.plan_id else 0 end) as customer_plan_id, 
                  SUM(case when pla.type = 'company' then pla.plan_id else 0 end) as company_plan_id
          FROM    app.product pro inner join app.family fam on pro.family_id = fam.id
                                  left outer join app.productplan pla on pro.id = pla.product_id and pla.agent_id = $1
          WHERE   pro.isActive IS true AND
                  pro.family_id = $2
          GROUP   BY
                  pro.id
          ORDER   BY 
                  pro.name`,
      [family_id, agent_id]
    );

    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export {
  createProduct,
  updateProduct,
  deleteProduct,
  deletePlans,
  getProduct,
  listProducts,
  getProductByFamilyId,
};
