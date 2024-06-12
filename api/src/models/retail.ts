import pool from "../util/database";

import {
  _getBySearchValues,
  _getCustomersByRetailIdAndProductId,
  _getSales
} from "../queries/retail";

const create: any = async (
  rut: string,
  name: string,
  legalrepresentative: string,
  line: string,
  fantasyName: string,
  address: string,
  district: string,
  email: string,
  phone: string,
  logo: string
) => {
  try {
    const arrayValues = [
      rut,
      name,
      legalrepresentative,
      line,
      fantasyName,
      address,
      district,
      email,
      phone,
      logo,
    ];

    const resultRetail = await pool.query(
      "SELECT 1 FROM app.retail WHERE rut = $1",
      [rut]
    );

    let query: string;
    if (resultRetail.rows.length > 0) {
      query = `
        UPDATE  app.retail
        SET     name = $2,
                legalrepresentative = $3,
                line = $4,
                fantasyname = $5,
                address = $6,
                district = $7,
                email = $8,
                phone = $9,
                logo = $10,
                isactive = true
        WHERE   rut = $1 RETURNING *`;
    } else {
      query = `
        INSERT  INTO app.retail(
                rut,
                name,
                legalrepresentative,
                line,
                fantasyname,
                address,
                district,
                email,
                phone,
                logo) 
        VALUES( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;
    }

    const result = await pool.query(query, arrayValues);

    const data = {
      id: result.rows[0].id,
      rut: result.rows[0].rut,
      name: result.rows[0].name,
      legalRepresentative: result.rows[0].legalrepresentative,
      line: result.rows[0].line,
      fantasyName: result.rows[0].fantasyname,
      address: result.rows[0].address,
      district: result.rows[0].district,
      email: result.rows[0].email,
      phone: result.rows[0].phone,
      logo: result.rows[0].logo,
    };

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getById: any = async (id: string) => {
  try {
    const result = await pool.query(
      `
        SELECT  id,
                rut,
                name,
                legalrepresentative,
                line,
                fantasyname,
                address,
                district,
                email,
                phone,
                logo
        FROM    app.retail
        WHERE   id = $1`,
      [id]
    );

    const {
      rut,
      name,
      legalrepresentative,
      line,
      fantasyname,
      address,
      district,
      email,
      phone,
      logo,
    } = result.rows[0] || [];

    const data = {
      id,
      rut,
      name,
      legalRepresentative: legalrepresentative,
      line,
      fantasyName: fantasyname,
      address,
      district,
      email,
      phone,
      logo,
    };

    return { success: true, data: result.rows[0] ? data : null, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getByRut: any = async (rut: string) => {
  try {
    const result = await pool.query(
      `
        SELECT  id,
                rut,
                name,
                legalrepresentative,
                line,
                fantasyname,
                address,
                district,
                email,
                phone,
                logo
        FROM    app.retail
        WHERE   rut = $1`,
      [rut]
    );

    const {
      id,
      name,
      legalrepresentative,
      line,
      fantasyname,
      address,
      district,
      email,
      phone,
      logo,
    } = result.rows[0] || [];

    const data = {
      id,
      rut,
      name,
      legalRepresentative: legalrepresentative,
      line,
      fantasyName: fantasyname,
      address,
      district,
      email,
      phone,
      logo,
    };

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getAll: any = async () => {
  try {
    const result = await pool.query(
      `
        SELECT  id,
                rut,
                name,
                legalrepresentative,
                line,
                fantasyname,
                address,
                district,
                email,
                phone
        FROM    app.retail
        WHERE   isactive is true`
    );

    const data = result.rows.map((row) => {
      const {
        id,
        rut,
        name,
        legalrepresentative,
        line,
        fantasyname,
        address,
        district,
        email,
        phone,
      } = row;
      return {
        id,
        rut,
        name,
        legalRepresentative: legalrepresentative,
        line,
        fantasyName: fantasyname,
        address,
        district,
        email,
        phone,
      };
    });

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getProductsAndRetail: any = async () => {
  try {
    const result = await pool.query(
      `
      SELECT
        ret.id AS retail_id,
        ret.rut AS retail_rut,
        ret.name AS retail_name,
        array_agg(jsonb_build_object('id', pro.id, 'name', pro.name,'productplan_id', pla.id )) AS products
      FROM
        app.retail ret
      JOIN
        app.retailproduct rpt ON ret.id = rpt.retail_id
      JOIN
        app.product pro ON rpt.product_id = pro.id
       JOIN
        app.productplan pla on pro.id = pla.product_id and ret.id = pla.agent_id
      WHERE
        ret.isactive IS TRUE
      GROUP BY
        ret.id, ret.rut, ret.name, ret.legalrepresentative, ret.line, ret.fantasyname,
        ret.address, ret.district, ret.email, ret.phone;`
    );

    const data = result.rows.map((row) => {
      const { retail_id, retail_rut, retail_name, products } = row;

      const retailInfo = {
        id: retail_id,
        rut: retail_rut,
        name: retail_name,
        products: products || [],
      };

      return retailInfo;
    });

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};
const getBySearchValues: any = async (rut: string, name: string) => {
  try {
    const result = await pool.query(_getBySearchValues(rut, name));
    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getCustomersByRetailIdAndProductId: any = async (
  retail_id: string,
  productPlan_id: string
) => {
  try {
    const result = await pool.query(_getCustomersByRetailIdAndProductId, [
      retail_id,
      productPlan_id,
    ]);

    const data = result.rows.map((row) => {
      const {
        customer_id,
        customer_rut,
        customer_name,
        customer_paternallastname,
        customer_maternallastname,
        customer_address,
        customer_district,
        customer_phone,
        customer_email,
        insured_id,
        insured_rut,
        insured_name,
        insured_paternallastname,
        insured_maternallastname,
        insured_address,
        insured_district,
        insured_phone,
        insured_email,
        insured_birthdate,
        createdate,
        initialdate,
        enddate,
      } = row;

      return {
        customer_id,
        customer_rut,
        customer_name,
        customer_paternalLastName: customer_paternallastname,
        customer_maternalLastName: customer_maternallastname,
        customer_address,
        customer_district,
        customer_phone,
        customer_email,
        insured_id,
        insured_rut,
        insured_name,
        insured_paternalLastName: insured_paternallastname,
        insured_maternalLastName: insured_maternallastname,
        insured_address,
        insured_district,
        insured_phone,
        insured_email,
        insured_birthDate: insured_birthdate,
        createDate: createdate,
        initialDate: initialdate,
        endDate: enddate,
      };
    });

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const deleteById: any = async (id: string) => {
  try {
    const result = await pool.query(
      `UPDATE app.retail SET isactive = false WHERE id = $1`,
      [id]
    );

    return { success: true, data: "OK", error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const updateLogo: any = async (id: string, logo: string) => {
  try {
    const result = await pool.query(
      `UPDATE app.retail SET logo = $2 WHERE id = $1`,
      [id, logo]
    );

    return { success: true, data: "OK", error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const updatePaymentCodes: any = async (retail_id: string, codes: any) => {
  try {
    const result = await pool.query(
      `select app.retail_update_payment($1, $2)`,
      [retail_id, codes]
    );

    return {
      success: true,
      response: result.rows[0].retail_update_payment,
      error: null,
    };
  } catch (e) {
    return { success: false, response: null, error: (e as Error).message };
  }
};

const getFamiliesByRetailId: any = async (id: string) => {
  try {
    const result = await pool.query(
      ` select  distinct
                fam.id,
                fam.icon,
                fam.name
        from	  app.product pro
                  inner join app.family fam on pro.family_id = fam.id
                  inner join app.retailproduct bpr on pro.id = bpr.product_id
        where	  bpr.retail_id = $1 and
                bpr.isActive is true`,
      [id]
    );

    const data = result.rows.map((row) => {
      const { id, icon, name } = row;
      return {
        id,
        icon,
        name,
      };
    });

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getProductsByRetailIdAndFamilyId: any = async (
  id: string,
  family_id: string
) => {
  try {
    const result = await pool.query(
      ` select  pro.id,
                pro.name,
                pro.currency,
                pro.frequency,
                bpr.companyprice,
                bpr.customerprice
        from    app.product pro
                  inner join app.family fam on pro.family_id = fam.id
                  inner join app.retailproduct bpr on pro.id = bpr.product_id
        where   bpr.retail_id = $1 and
                fam.id = $2 and
                bpr.isActive is true`,
      [id, family_id]
    );

    const data = result.rows.map((row) => {
      const { id, name, companyprice, customerprice, currency, frequency } =
        row;
      return {
        id,
        name,
        currency,
        frequency,
        price: { P: customerprice, C: companyprice },
      };
    });

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getCollectById: any = async (id: string) => {
  try {
    const result = await pool.query(
      `
      select	customer_name,
              customer_email,
              customer_phone,
              '' as executive_name,
              product_name,
              to_char(incorporation, 'DD-MM-YYYY') as incorporation,
              fee_value,
              free_months,
              fees - free_months as fees_charged,
              fee_value * (fees - free_months) as charged,
              paid,
              case when (fee_value * (fees - free_months)) - paid > 0 then (fee_value * (fees - free_months)) - paid else 0 end as balance
      from 	(
              select	max(age.name) as channel_name,
                      max(bro.name) as retail_name,
                      max(concat(cus.name,' ', cus.paternallastname, ' ', cus.maternallastname)) as customer_name,
                      max(cus.email) as customer_email,
                      max(cus.phone) as customer_phone,
                      max(pro.name) as product_name,
                      min(case when pay.date is null then sub.date else pay.date end) as incorporation,
                      max(lpr.price) as fee_value,
                      max(case when ppl.discount_type = 't' and ppl.discount_cicles > 0 then ppl.discount_cicles else 0 end) as free_months,
                      (extract(month from age(now(), min(case when pay.date is null then sub.date else pay.date end))) + 1) as fees,
                      sum(case when pay.amount is null then 0 else pay.amount end) paid
              from	  app.lead lea
                        left outer join app.agent age on lea.agent_id = age.id
                        left outer join app.retail bro on lea.agent_id = bro.id
                        left outer join app.customer cus on lea.customer_id = cus.id
                        left outer join app.leadproduct lpr on lea.id = lpr.lead_id
                        left outer join app.productplan ppl on lpr.productplan_id = ppl.plan_id
                        left outer join app.product pro on lpr.product_id = pro.id
                        left outer join app.subscription sub on lea.subscription_id = sub.subscription_id
                        left outer join app.payment pay on pay.subscription_id = sub.subscription_id
              where   not lea.policy_id is null and
                      lea.agent_id = $1
              group  	by
                      sub.subscription_id) as report
      order 	by
              customer_name,
              product_name`,
      [id]
    );

    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getCustomerByRut: any = async (productPlan_id: string, rut: string) => {
  try {
    const result = await pool.query(
      ` SELECT
      lea.id as lead_id,
      ret.id as retail_id
    FROM
      app.retail ret
    INNER JOIN
      app.lead lea ON ret.id = lea.agent_id AND NOT lea.policy_id IS NULL
    INNER JOIN
      app.leadproduct lpr ON lea.id = lpr.lead_id
    INNER JOIN
      app.customer cus ON lea.customer_id = cus.id
    INNER JOIN
      app.productplan ppl ON ret.id = ppl.agent_id AND lpr.productplan_id = ppl.plan_id
    WHERE
      ppl.id = $1 AND
      cus.rut = $2;`,
      [productPlan_id, rut]
    );

    return {
      success: true,
      data: result.rows.length > 0 ? result.rows[0] : null,
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const expireInsured: any = async (productPlan_id: string) => {
  try {
    const result = await pool.query(
      `
      update 	app.policy
      set 	  enddate = (now()::date - interval '1 day')::date
      where 	id in (
            select  pol.id
            from    app.lead lea
                      inner join app.leadproduct lpr on lea.id = lpr.lead_id
                      inner join app.productplan ppl on lpr.productplan_id = ppl.plan_id
                      inner join app.policy pol on lea.policy_id = pol.id
            where 	(pol.enddate is null or pol.enddate::date >= now()::date) and
                    ppl.id = $1)`,
      [productPlan_id]
    );

    return {
      success: true,
      data: "OK",
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getByUserId: any = async (user_id: string) => {
  try {
    const result = await pool.query(
      `
select 	ret."name" ,
		ret.id ,
		usr.login 
	from app.retail ret
		inner join app.user_rol_agent ura on ret.id = ura.agent_id 
		inner join app.user_rol ur on ura.user_rol_id = ur.id 
		inner join app.user usr on ur.user_id = usr.id
	where usr.id = $1`,
      [user_id]
    );

    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getProductsById: any = async (id: string) => {
  try {
    const result = await pool.query(
      `select app.retail_get_products_by_id($1)`,
      [id]
    );

    return {
      success: true,
      data: result.rows[0].retail_get_products_by_id,
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getCollectionById: any = async (id: string) => {
  try {
    const result = await pool.query(
      `select app.retail_get_collection_by_id($1)`,
      [id]
    );

    return {
      success: true,
      data: result.rows[0].retail_get_collection_by_id,
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getPayments: any = async (id: string) => {
  try {
    const result = await pool.query(`select app.retail_get_payment($1)`, [id]);

    return {
      success: true,
      data: result.rows[0].retail_get_payment,
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const upsertCode: any = async (lead_id: string, agent_id: string) => {
  try {
    const result = await pool.query(
      `select lpy.code, lpy.lead_id from 	app.lead lea
        inner join app.leadpayment lpy on lea.id = lpy.lead_id
  where 	lea.agent_id = $1 and lea.policy_id is null `,
      [agent_id]
    );
    if (result.rows.length > 0 && lead_id !== "" && lead_id) {
      function getNextCode(currentCode: any) {
        const alphaPart = currentCode.match(/[A-Z]+/)[0];
        const numericPart = parseInt(currentCode.match(/[0-9]+/)[0]);

        if (alphaPart === "ZZ" && numericPart === 999) {
          return "AAA001";
        } else if (numericPart < 999) {
          const nextNumericPart = numericPart + 1;
          return alphaPart + nextNumericPart.toString().padStart(3, "0");
        } else {
          let nextAlphaPart = "";
          let carry = true;
          for (let i = alphaPart.length - 1; i >= 0; i--) {
            if (carry) {
              const nextCharCode = alphaPart.charCodeAt(i) + 1;
              if (nextCharCode <= "Z".charCodeAt(0)) {
                nextAlphaPart =
                  String.fromCharCode(nextCharCode) + nextAlphaPart;
                carry = false;
              } else {
                nextAlphaPart = "A" + nextAlphaPart;
              }
            } else {
              nextAlphaPart = alphaPart[i] + nextAlphaPart;
            }
          }
          return nextAlphaPart + "001";
        }
      }
      let currentCode = "AA000";
      for (const row of result.rows) {
        const code = row.code;
        if (code > currentCode) {
          currentCode = code;
        }
      }

      const nextCode = getNextCode(currentCode);
      const resultLeadPayment = await pool.query(
        `SELECT code FROM app.leadpayment WHERE lead_id = $1`,
        [lead_id]
      );
      if (resultLeadPayment.rows.length > 0) {
        const existingCode = resultLeadPayment.rows[0].code;
        if (existingCode !== "" && existingCode !== null) {
        } else {
            await pool.query(
                `UPDATE app.leadpayment SET code = $1 WHERE lead_id = $2`,
                [nextCode, lead_id]
            );
        }
    } else {
        await pool.query(
            `INSERT INTO app.leadpayment (lead_id, code, createddate) VALUES ($1, $2, NOW()) RETURNING code`,
            [lead_id, nextCode]
        );
    }
    

      return {
        success: true,
        data: nextCode,
        error: null,
      };
    }
    return {
      success: true,
      data: "",
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getSales = async (id: string) => {
  try {
    const response = await pool.query(_getSales, [id])
    if(!response){
      return {
        success: false,
        data: null,
        error: "Error"
      }
    }
    else{
      return {
        success: true,
        data: response.rows,
        error: null
      }
    }
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
}

export {
  create,
  getById,
  getByRut,
  getAll,
  getProductsAndRetail,
  updateLogo,
  updatePaymentCodes,
  deleteById,
  getFamiliesByRetailId,
  getProductsByRetailIdAndFamilyId,
  getCollectById,
  getBySearchValues,
  getCustomersByRetailIdAndProductId,
  getCustomerByRut,
  expireInsured,
  getByUserId,
  getProductsById,
  getCollectionById,
  getPayments,
  upsertCode,
  getSales
};
