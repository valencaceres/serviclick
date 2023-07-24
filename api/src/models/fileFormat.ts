import pool from "../util/database";

const create: any = async (
  lead_id: string,
  field_id: string,
  number: number
) => {
  try {
    const query = `
        insert  into app.fileformat (lead_id, field_id, number)
        values 	($1, $2, $3)`;
    const result = await pool.query(query, [lead_id, field_id, number]);
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getAll: any = async () => {
  try {
    const query = `
        select 	distinct
                com.id,
                com.rut,
                com.companyname
        from  	app.fileformat fil
                inner join app.lead lea on fil.lead_id = lea.id
                inner join app.company com on lea.company_id = com.id
        order 	by
                com.companyname`;

    const result = await pool.query(query);
    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getByLeadId: any = async (lead_id: string) => {
  try {
    const query = `
        select 	fil.id,
                case when fie.id is null then 'value' else fie.db_name end as field_db_name,
                case when fie.id is null then 'value' else 'insured' end as field_type,
                case when fie.id is null then val.id else fie.id end as field_id,
                case when fie.name is null then val.name else fie.name end as field_name,
                case when fie.format is null then vtp.description else fie.format end as field_format
        from 	  app.fileformat fil 
                  left outer join app.field fie on fil.field_id = fie.id
                  left outer join app.value val on fil.field_id = val.id
                  left outer join app.valuetype vtp on val.valuetype_code = vtp.code
        where 	fil.lead_id = $1
        order 	by
                fil.number`;

    const result = await pool.query(query, [lead_id]);
    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getBySubscriptionId: any = async (subscription_id: number) => {
  try {
    const query = `
        select 	lea.id as lead_id,
                lpr.product_id as product_id,
                fil.id,
                case when fie.id is null then 'value' else fie.db_name end as field_db_name,
                case when fie.id is null then 'value' else 'insured' end as field_type,
                case when fie.id is null then val.id else fie.id end as field_id,
                case when fie.name is null then val.name else fie.name end as field_name,
                case when fie.format is null then vtp.description else fie.format end as field_format
        from 	  app.fileformat fil 
                  inner join app.lead lea on fil.lead_id = lea.id
                  inner join app.leadproduct lpr on lea.id = lpr.lead_id
                  left outer join app.field fie on fil.field_id = fie.id
                  left outer join app.value val on fil.field_id = val.id
                  left outer join app.valuetype vtp on val.valuetype_code = vtp.code
        where 	lea.subscription_id = $1
        order 	by
                fil.number`;

    const result = await pool.query(query, [subscription_id]);

    const data = {
      lead_id: result.rows[0].lead_id,
      subscription_id,
      product_id: result.rows[0].product_id,
      fields: result.rows.map((row: any) => ({
        id: row.id,
        field_db_name: row.field_db_name,
        field_type: row.field_type,
        field_id: row.field_id,
        field_name: row.field_name,
        field_format: row.field_format,
      })),
    };

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const deleteByLeadId: any = async (lead_id: string) => {
  try {
    const query = `
          delete  from app.fileformat fil 
          where 	fil.lead_id = $1`;

    const result = await pool.query(query, [lead_id]);
    return { success: true, data: true, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create, getAll, getByLeadId, getBySubscriptionId, deleteByLeadId };
