import pool from "../util/database";

const create: any = async (
  family_id: string,
  name: string,
  valuetype_code: string
) => {
  try {
    const result = await pool.query(
      "INSERT INTO app.value(family_id, name, valuetype_code) VALUES ($1, $2, $3) RETURNING *",
      [family_id, name, valuetype_code]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const updateById: any = async (
  id: string,
  family_id: string,
  name: string,
  valuetype_code: string
) => {
  try {
    const result = await pool.query(
      "UPDATE app.value SET family_id = $2, name = $3, valuetype_code = $4 WHERE id = $1 RETURNING *",
      [id, family_id, name, valuetype_code]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getAll: any = async () => {
  try {
    const result = await pool.query(
      `SELECT   val.id,
                fam.id as family_id, 
                fam.name as family_name, 
                val.name, 
                val.valuetype_code 
       FROM     app.value val inner join app.family fam on val.family_id = fam.id
       ORDER    BY 
                fam.name, 
                val.name`
    );

    const data = result.rows.map((item: any) => {
      return {
        id: item.id,
        name: item.name,
        valuetype_code: item.valuetype_code,
        family: {
          id: item.family_id,
          icon: item.family_icon,
          name: item.family_name,
        },
      };
    });

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getById: any = async (id: string) => {
  try {
    const result = await pool.query(
      ` SELECT    val.id,
                  fam.id as family_id, 
                  fam.icon as family_icon, 
                  fam.name as family_name, 
                  val.name, 
                  val.valuetype_code 
         FROM     app.value val inner join app.family fam on val.family_id = fam.id
         WHERE    val.id = $1
         ORDER    BY 
                  fam.name, 
                  val.name`,
      [id]
    );

    const { name, valuetype_code, family_id, family_icon, family_name } =
      result.rows[0];

    const data = {
      id,
      name,
      valuetype_code,
      family: {
        id: family_id,
        icon: family_icon,
        name: family_name,
      },
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
        from    app.family fam inner join app.value val on fam.id = val.family_id
        order 	by
                fam.name`
    );

    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getByFamilyId = async (family_id: string) => {
  try {
    const result = await pool.query(
      `
        select  val.id,
                fam.id as family_id,
                fam.icon as family_icon,
                fam.name as family_name,
                val.name,
                val.valuetype_code
        from    app.family fam inner join app.value val on fam.id = val.family_id
        where   fam.id = $1
        order 	by
                fam.name,
                val.name`,
      [family_id]
    );

    const data = result.rows.map((item: any) => {
      return {
        id: item.id,
        name: item.name,
        valuetype_code: item.valuetype_code,
        family: {
          id: item.family_id,
          icon: item.family_icon,
          name: item.family_name,
        },
      };
    });

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create, updateById, getAll, getById, getFamilies, getByFamilyId };
