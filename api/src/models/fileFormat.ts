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
                fie.id as field_id,
                fie.name as field_name,
                fie.format as field_format
        from 	  app.fileformat fil 
                inner join app.field fie on fil.field_id = fie.id
        where 	fil.lead_id = $1
        order 	by
                fil.number`;

    const result = await pool.query(query, [lead_id]);
    return { success: true, data: result.rows, error: null };
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

export { create, getAll, getByLeadId, deleteByLeadId };
