import pool from "../util/database";

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

    const resultBroker = await pool.query(
      "SELECT 1 FROM app.broker WHERE rut = $1",
      [rut]
    );

    let query: string;
    if (resultBroker.rows.length > 0) {
      query = `
        UPDATE  app.broker
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
        INSERT  INTO app.broker(
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
        FROM    app.broker
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
        FROM    app.broker
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
        FROM    app.broker
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

const deleteById: any = async (id: string) => {
  try {
    const result = await pool.query(
      `UPDATE app.broker SET isactive = false WHERE id = $1`,
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
      `UPDATE app.broker SET logo = $2 WHERE id = $1`,
      [id, logo]
    );

    return { success: true, data: "OK", error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getFamiliesByBrokerId: any = async (id: string) => {
  try {
    const result = await pool.query(
      ` select  distinct
                fam.id,
                fam.icon,
                fam.name
        from	  app.product pro
                  inner join app.family fam on pro.family_id = fam.id
                  inner join app.brokerproduct bpr on pro.id = bpr.product_id
        where	  bpr.broker_id = $1 and
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

const getProductsByBrokerIdAndFamilyId: any = async (
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
                  inner join app.brokerproduct bpr on pro.id = bpr.product_id
        where   bpr.broker_id = $1 and
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
                      max(bro.name) as broker_name,
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
                        left outer join app.broker bro on lea.agent_id = bro.id
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

const getByUserId: any = async (user_id: string) => {
  try {
    const result = await pool.query(
      `
select  ura.channel_code, 
        bro.id,
        bro."name" 
    from app."user" usr
        inner join app.user_rol ur on usr.id = ur.user_id 
        inner join app.user_rol_agent ura on ur.id = ura.user_rol_id
        inner join app.broker bro on ura.agent_id = bro.id 
    where usr.id = $1
    `,
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
      `select app.broker_get_products_by_id($1)`,
      [id]
    );

    return {
      success: true,
      data: result.rows[0].broker_get_products_by_id,
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getCollectionById: any = async (id: string) => {
  try {
    const result = await pool.query(
      `select app.broker_get_collection_by_id($1)`,
      [id]
    );

    return {
      success: true,
      data: result.rows[0].broker_get_collection_by_id,
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getAssistancesByBrokerIdAndProductId = async (
  broker_id: string,
  product_id: string
) => {
  try {
    const result = await pool.query(
      `select app.broker_get_product_detail_by_broker_id_and_product_id($1, $2)`,
      [broker_id, product_id]
    );
    return {
      success: true,
      data: result.rows[0]
        .broker_get_product_detail_by_broker_id_and_product_id,
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getProductAndAssistancesByBrokerId = async (broker_id: string) => {
  try {
    const response = await pool.query(`
  select	pro.id,
          pl.id as "productplan_id",
          pro."name" ,
          pd.description,
          pl.price,
          pl.baseprice,
          pl.discount_percent ,
          pl.beneficiary_price, 
          pd.hiring_conditions,
          plf.base64,
		    (
	        SELECT json_agg(
	            json_build_object(
	                'id', pa.id,
	                'name', asi.name,
	                'description', asi.description,
	                'amount', pa.amount,
	                'currency', pa.currency,
	                'maximun', pa.maximum,
	                'events', pa.events,
	                'lack', pa.lack
		            )
		        )
		        FROM app.productassistance pa
		        	inner join app.assistance asi on pa.assistance_id = asi.id
		        WHERE pa.product_id = pro.id
		    ) AS assistances
	from app.brokerproduct bp
		inner join app.product pro on bp.product_id = pro.id 
		inner join app.productdescription pd on pro.id = pd.product_id 
		inner join app.productplan pl on pro.id = pl.product_id 
    inner join app.productplanpdf plf on pl.id = plf.productplan_id
	where bp.broker_id = $1`, [broker_id])

      return {
        success: true,
        data: response.rows,
        error: null
      }
  } catch (e:any) {
   return {success: false, data: null, error: e.response.data || e.message}
  }
}

export {
  create,
  getById,
  getByRut,
  getAll,
  updateLogo,
  deleteById,
  getFamiliesByBrokerId,
  getProductsByBrokerIdAndFamilyId,
  getCollectById,
  getByUserId,
  getProductsById,
  getCollectionById,
  getAssistancesByBrokerIdAndProductId,
  getProductAndAssistancesByBrokerId
};
