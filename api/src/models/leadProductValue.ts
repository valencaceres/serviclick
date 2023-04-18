import pool from "../util/database";

const deleteByInsuredId: any = async (
  lead_id: string,
  product_id: string,
  insured_id: string
) => {
  try {
    const result = await pool.query(
      `DELETE FROM app.leadproductvalue WHERE lead_id = $1 and product_id = $2 and insured_id = $3`,
      [lead_id, product_id, insured_id]
    );

    return { success: true, data: "Values deleted", error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const create: any = async (
  lead_id: string,
  product_id: string,
  insured_id: string,
  value_id: string,
  value: string
) => {
  try {
    const resultExists = await pool.query(
      `SELECT * FROM app.leadproductvalue WHERE lead_id = $1 and product_id = $2 and insured_id = $3 and value_id = $4`,
      [lead_id, product_id, insured_id, value_id]
    );

    if (resultExists.rowCount > 0) {
      const result = await pool.query(
        `UPDATE app.leadproductvalue SET value = $1 WHERE lead_id = $2 and product_id = $3 and insured_id = $4 and value_id = $5`,
        [value, lead_id, product_id, insured_id, value_id]
      );

      return { success: true, data: result.rows[0], error: null };
    }

    const result = await pool.query(
      `
        INSERT  INTO app.leadproductvalue(
                lead_id,
                product_id,
                insured_id,
                value_id,
                value) 
        VALUES( $1, $2, $3, $4, $5) RETURNING *`,
      [lead_id, product_id, insured_id, value_id, value]
    );

    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getByInsuredId: any = async (
  lead_id: string,
  product_id: string,
  insured_id: string
) => {
  try {
    const result = await pool.query(
      `
        select	value_id,
                max(valuetype_code) as valuetype_code,
                max(family_id :: text) as family_id,
                max(family_name) as family_name,
                max(value_name) as value_name, 
                max(value) as value
        from (  select	val.id as value_id,
                        val.valuetype_code,
                        val.family_id,
                        fam.name as family_name,
                        val.name as value_name, 
                        '' as value
                from    app.product pro
                            inner join app.productassistance pas on pro.id = pas.product_id
                            inner join app.assistancevalue asv on pas.assistance_id = asv.assistance_id
                            inner join app.value val on asv.value_id = val.id
                            inner join app.family fam on val.family_id = fam.id
                where   pro.id = $2
                        
                union 	all
                        
                select	val.id as value_id,
                        val.valuetype_code,
                        val.family_id,
                        fam.name as family_name,
                        val.name as value_name,
                        lpv.value
                from 	app.lead lea 
                            inner join app.leadproduct lpr on lea.id = lpr.lead_id
                            inner join app.leadinsured lin on lea.id = lin.lead_id
                            inner join app.leadproductvalue lpv on lpv.lead_id = lea.id and lpv.product_id = lpr.product_id and lpv.insured_id = lin.insured_id
                            inner join app.value val on lpv.value_id = val.id
                            inner join app.family fam on val.family_id = fam.id
                where 	lea.id = $1 and
                        lpr.product_id = $2 and
                        lin.insured_id = $3) as values
        group	  by
                value_id
        order 	by
                max(family_name),
                max(value_name)`,
      [lead_id, product_id, insured_id]
    );
    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getById: any = async (
  insured_id: string,
  product_id: string,
  assistance_id: string
) => {
  try {
    const result = await pool.query(
      `SELECT LPV.value,
              VAL.name as value_name
      FROM app.leadproductvalue LPV
      INNER JOIN app.assistancevalue ASV ON LPV.value_id = ASV.value_id
      INNER JOIN app.value VAL on LPV.value_id = VAL.id
      WHERE LPV.insured_id = $1 
      AND LPV.product_id = $2 
      AND ASV.assistance_id = $3`,
      [insured_id, product_id, assistance_id]
    );

    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { deleteByInsuredId, create, getByInsuredId, getById };
