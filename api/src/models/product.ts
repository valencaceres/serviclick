import pool from "../util/database";

const createProduct: any = async (
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
        "UPDATE app.product SET cost = $1, issubject = $2, frequency = $3, term = $4, beneficiaries = $5, currency = $6, mininsuredcompanyprice = $7, dueday = $8, name = $9, family_id = $10 WHERE id = $11 RETURNING *",
        [
          cost,
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
        `INSERT INTO app.product(cost, issubject, frequency, term, beneficiaries, currency, mininsuredcompanyprice, dueday, name, family_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
        [
          cost,
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
                    SUM(case when pla.type = 'company' then pla.plan_id else 0 end) as company_plan_id
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
                  SUM(case when pla.type = 'company' then pla.plan_id else 0 end) as company_plan_id
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

const getById: any = async (id: string) => {
  try {
    const result = await pool.query(
      `
      select 	pro.id,
              pro.family_id,
              pro.name,
              pro.cost,
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
              pas.amount,
              pas.maximum,
              pas.events,
              pas.lack,
              pas.currency
        from 	app.product pro
                inner join app.productdescription des on pro.id = des.product_id
                inner join app.productassistance pas on pro.id = pas.product_id
                inner join app.assistance asi on pas.assistance_id = asi.id
        where 	pro.id = $1
        order 	by
                pas.number`,
      [id]
    );

    let data: any = {};

    if (result.rows.length > 0) {
      data = {
        id: result.rows[0].id,
        family_id: result.rows[0].family_id,
        name: result.rows[0].name,
        cost: result.rows[0].cost,
        isSubject: result.rows[0].issubject,
        frequency: result.rows[0].frequency,
        term: result.rows[0].term,
        beneficiaries: result.rows[0].beneficiaries,
        currency: result.rows[0].currency,
        dueDay: result.rows[0].dueday,
        minInsuredCompanyPrice: result.rows[0].mininsuredcompanyprice,
        title: result.rows[0].title,
        subTitle: result.rows[0].sub_title,
        alias: result.rows[0].alias,
        promotional: result.rows[0].promotional,
        description: result.rows[0].description,
        territorialScope: result.rows[0].territorial_scope,
        hiringConditions: result.rows[0].hiring_conditions,
        assistances: [],
      };

      result.rows.map((item: any) => {
        data = {
          ...data,
          assistances: [
            ...data.assistances,
            {
              id: item.assistance_id,
              name: item.assistance_name,
              amount: item.amount,
              maximum: item.maximum,
              events: item.events,
              lack: item.lack,
              currency: item.currency,
            },
          ],
        };
      });
    }

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
};
