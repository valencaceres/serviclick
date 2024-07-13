import pool from "../util/database";

const createProduct: any = async (
  id: string,
  family_id: string,
  name: string,
  cost: number,
  dynamiccharge: number,
  isSubject: boolean,
  frequency: string,
  term: string,
  beneficiaries: number,
  minInsuredCompanyPrice: number,
  dueDay: number,
  currency: string
) => {
  try {
    // const resultProduct = await pool.query(
    //   "SELECT pro.id FROM app.product pro inner join app.productdescription des on pro.id = des.product_id WHERE pro.family_id = $1 and pro.name = $2 and des.alias = $3",
    //   [family_id, name, alias]
    // );

    // if (resultProduct.rows.length > 0) {
    //   query =
    //     "UPDATE app.product SET cost = $1, issubject = $2, frequency = $3, term = $4, beneficiaries = $5, currency = $6, mininsuredcompanyprice = $7, dueday = $8 WHERE name = $9 and family_id = $10 RETURNING *";
    // } else {
    //   query =
    //     "INSERT INTO app.product(cost, issubject, frequency, term, beneficiaries, currency, mininsuredcompanyprice, dueday, name, family_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *";
    // }

    const arrayValues = [
      cost,
      dynamiccharge,
      isSubject,
      frequency,
      term,
      beneficiaries,
      currency,
      minInsuredCompanyPrice,
      dueDay,
      name,
      family_id,
      id,
    ];

    let result: any;

    if (id && id !== "") {
      result = await pool.query(
        "UPDATE app.product SET cost = $1, dynamiccharge = $2, issubject = $3, frequency = $4, term = $5, beneficiaries = $6, currency = $7, mininsuredcompanyprice = $8, dueday = $9, name = $10, family_id = $11 WHERE id = $12 RETURNING *",
        [
          cost,
          dynamiccharge,
          isSubject,
          frequency,
          term,
          beneficiaries,
          currency,
          minInsuredCompanyPrice,
          dueDay,
          name,
          family_id,
          id,
        ]
      );
    } else {
      result = await pool.query(
        `INSERT INTO app.product(cost, dynamiccharge, issubject, frequency, term, beneficiaries, currency, mininsuredcompanyprice, dueday, name, family_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
        [
          cost,
          dynamiccharge,
          isSubject,
          frequency,
          term,
          beneficiaries,
          currency,
          minInsuredCompanyPrice,
          dueDay,
          name,
          family_id,
        ]
      );
    }

    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getAll: any = async () => {
  try {
    const result = await pool.query(
      `SELECT DISTINCT ON (pro.id, prp.price)
          pro.id,
          pro.name,
          pro.currency,
          prp.type,
          prp.id as productplan_id,
          prp.price,
          CASE
              WHEN age.name IS NULL THEN
                  CASE
                      WHEN bro.name IS NULL THEN 'Retail'
                      ELSE 'Broker'
                  END
              ELSE 'Canal'
          END AS agent,
          CASE
              WHEN age.id IS NULL THEN
                  CASE
                      WHEN bro.id IS NULL THEN ret.id
                      ELSE bro.id
                  END
              ELSE age.id
          END AS agent_id,
          CASE
              WHEN age.name IS NULL THEN
                  CASE
                      WHEN bro.name IS NULL THEN ret.name
                      ELSE bro.name
                  END
              ELSE age.name
          END AS agent_name
      FROM app.product pro
      INNER JOIN app.productplan prp ON pro.id = prp.product_id
      LEFT OUTER JOIN app.agent age ON prp.agent_id = age.id
      LEFT OUTER JOIN app.broker bro ON prp.agent_id = bro.id
      LEFT OUTER JOIN app.retail ret ON prp.agent_id = ret.id
      WHERE pro.isactive IS TRUE
      ORDER BY pro.id, prp.price, pro.name;`
    );

    const groupedData = result.rows.reduce((acc: any, row: any) => {
      if (!acc[row.name]) {
        acc[row.name] = {
          name: row.name,
          id: row.id,
          product_plans: [],
        };
      }

      acc[row.name].product_plans.push({
        type: row.type,
        id: row.productplan_id,
        agent_id: row.agent_id,
        price: "$ " + row.price,
      });

      return acc;
    }, {});

    const groupedArray = Object.values(groupedData);

    return { success: true, data: groupedArray, error: null };
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
                    MAX(des.alias) as alias,
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
                    SUM(case when pla.type = 'company' then pla.plan_id else 0 end) as company_plan_id,
                    SUM(case when pla.type = 'yearly' then pla.plan_id else 0 end) as yearly_plan_id,
                    SUM(case when pla.type = 'yearly' then pla.price else 0 end) as yearly_plan_price
          FROM      app.product pro inner join app.family fam on pro.family_id = fam.id
                      left outer join app.productplan pla on pro.id = pla.product_id and pla.agent_id = $2
                      left outer join app.productdescription des on pro.id = des.product_id
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
                  MAX(des.alias) as alias,
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
                  SUM(case when pla.type = 'company' then pla.plan_id else 0 end) as company_plan_id,
                  SUM(case when pla.type = 'yearly' then pla.plan_id else 0 end) as yearly_plan_id,
                  SUM(case when pla.type = 'yearly' then pla.price else 0 end) as yearly_plan_price
          FROM    app.product pro inner join app.family fam on pro.family_id = fam.id
                                  left outer join app.productplan pla on pro.id = pla.product_id and pla.agent_id = $1
                                  left outer join app.productdescription des on pro.id = des.product_id
          WHERE   pro.isActive IS true
          GROUP   BY
                  pro.id
          ORDER   BY
                  MAX(fam.name),
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
                  SUM(case when pla.type = 'company' then pla.plan_id else 0 end) as company_plan_id,
                  SUM(case when pla.type = 'yearly' then pla.plan_id else 0 end) as yearly_plan_id,
                  SUM(case when pla.type = 'yearly' then pla.price else 0 end) as yearly_plan_price
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

const getById = async (id: string) => {
  try {
    const sqlQuery = `
       SELECT  	pro.id, 
       			pro.family_id, 
       			pro.name, 
       			pro.cost, 
       			pro.dynamiccharge, 
       			pro.issubject,
              	pro.frequency, 
              	pro.term, 
              	pro.beneficiaries, 
              	pro.currency,
             	pro.dueday, 
             	pro.mininsuredcompanyprice, 
             	des.title, 
             	des.sub_title,
              	des.alias, 
              	des.promotional, 
              	des.description, 
              	des.territorial_scope,
              	des.hiring_conditions, 
              	pas.number, 
              	asi.id as assistance_id,
              	asi.name as assistance_name, 
              	fam."name" as section ,
              	pas.amount, 
              	pas.maximum,
              	pas.events, 
              	pas.lack, 
              	pas.currency
      FROM 	app.product pro
      INNER JOIN app.productdescription des ON pro.id = des.product_id
      LEFT OUTER JOIN app.productassistance pas ON pro.id = pas.product_id
      LEFT OUTER JOIN app.assistance asi ON pas.assistance_id = asi.id
      left outer join app.family fam on asi.family_id = fam.id 
      WHERE 	pro.id = $1
      ORDER 	BY pas.number
    `;

    const result = await pool.query(sqlQuery, [id]);
    const { rows } = result;

    if (rows.length === 0) {
      return { success: false, data: null, error: "No data found" };
    }

    const firstRow = rows[0];
    const data = {
      id: firstRow.id,
      productPlan_id: firstRow.productplan_id,
      family_id: firstRow.family_id,
      name: firstRow.name,
      cost: firstRow.cost,
      price: firstRow.productplan_price,
      basePrice: firstRow.baseprice,
      dynamiccharge: firstRow.dynamiccharge,
      isSubject: firstRow.issubject,
      frequency: firstRow.frequency,
      term: firstRow.term,
      beneficiaries: firstRow.beneficiaries,
      currency: firstRow.currency,
      dueDay: firstRow.dueday,
      minInsuredCompanyPrice: firstRow.mininsuredcompanyprice,
      title: firstRow.title,
      subTitle: firstRow.sub_title,
      alias: firstRow.alias,
      promotional: firstRow.promotional,
      description: firstRow.description,
      territorialScope: firstRow.territorial_scope,
      hiringConditions: firstRow.hiring_conditions,
      assistances: rows
        .filter((row) => row.assistance_id !== null)
        .map((row) => ({
          id: row.assistance_id,
          name: row.assistance_name,
          amount: row.amount,
          maximum: row.maximum,
          events: row.events,
          lack: row.lack,
          currency: row.currency,
          section: row.section
        })),
    };

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getFamilies = async () => {
  try {
    const result = await pool.query(
      `
        select  DISTINCT
                fam.id,
                fam.icon,
                fam.name
        from    app.family fam inner join app.product pro on fam.id = pro.family_id
        where   pro.isactive is true
        order 	by
                fam.name`
    );

    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getByRetailRut = async (rut: string) => {
  try {
    const sqlQuery = `select    ret.rut,
                        pro.name,
                        rpt.companyprice,
                        pla.id as productplan_id,
                        pla.product_id,
                        pla.agent_id
                    from    app.retail ret
                        inner join app.retailproduct rpt on ret.id = rpt.retail_id
                        inner join app.product pro on rpt.product_id = pro.id
                        inner join app.productplan pla on pro.id = pla.product_id and ret.id = pla.agent_id
                    where   ret.rut = $1`;
    const result = await pool.query(sqlQuery, [rut]);
    const { rows } = result;

    if (rows.length === 0) {
      return { success: false, data: null, error: "No data found" };
    }

    const data = rows.map((row) => ({
      productplan_id: row.productplan_id,
      product_id: row.product_id,
      name: row.name,
      price: row.companyprice,
      agent_id: row.agent_id,
    }));

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const listByFamilies = async (agent: string) => {
  try {
    const sqlQuery = `SELECT
                          fam.id AS family_id,
                          fam.name AS family_name,
                          wef.url as url,
                          wef.link as link,
                          pro.id AS product_id,
                          pro.name AS product_name,
                          pro.beneficiaries as beneficiaries,
                          ppl.id AS productplan_id,
                          ppl.price,
                          brp.yearlyprice as yearly_price,
                          brp.yearly_plan_id as yearly_plan_id,
                          ppy.id as yearly_product_plan_id,
                          ppl.frequency as frequency,
                          ppl.beneficiary_price as beneficiary_price,
                          ppf.base64 as pdfbase,
                          age.fantasyname AS agent_slug,
                          age.name AS agent_name,
                          asi.id AS assistance_id,
                          asi.name AS coverage_name,
                          pas.amount AS coverage_amount,
                          pas.maximum AS coverage_maximum,
                          pas.events AS coverage_events,
                          pas.lack AS coverage_lack,
                          pas.currency AS coverage_currency
                      FROM
                          app.product pro
                          INNER JOIN app.productplan ppl ON pro.id = ppl.product_id
                          left join app.productplanpdf ppf on ppl.id = ppf.productplan_id
                          INNER JOIN app.productassistance pas ON pro.id = pas.product_id
                          INNER JOIN app.assistance asi ON pas.assistance_id = asi.id
                          INNER JOIN app.agent age ON ppl.agent_id = age.id
                          INNER JOIN app.family fam ON pro.family_id = fam.id
                          LEFT JOIN app.www_family wef ON fam.id = wef.family_id
                          left join app.agentproduct brp on pro.id = brp.product_id
                          left join app.productplan ppy on ppy.plan_id = brp.yearly_plan_id
                          WHERE
                          (age.id::TEXT = $1 OR age.fantasyname = $1)
                          AND ppl.type = 'customer'
                      ORDER BY
                      wef.number NULLS LAST,
                          fam.name,
                          pro.name,
                          pas.number`;

    const result = await pool.query(sqlQuery, [agent]);

    return { success: true, data: result.rows, error: null };
  } catch (error) {
    return { success: false, data: null, error: (error as Error).message };
  }
};

const getSuscriptionsByAgentId = async (agent: string) => {
  try {
    const sqlQuery = `SELECT
    id,
    agent_id
FROM
    app.lead
WHERE
    agent_id::TEXT = $1
ORDER BY
    createdate DESC;
                    `;

    const result = await pool.query(sqlQuery, [agent]);

    return { success: true, data: result.rows, error: null };
  } catch (error) {
    return { success: false, data: null, error: (error as Error).message };
  }
};
export {
  createProduct,
  updateProduct,
  getAll,
  deleteProduct,
  deletePlans,
  getById,
  getProduct,
  listProducts,
  getProductByFamilyId,
  getFamilies,
  getByRetailRut,
  listByFamilies,
  getSuscriptionsByAgentId
};
