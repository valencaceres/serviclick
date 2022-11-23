import pool from "../util/database";

const getByAssistanceId: any = async (assistance_id: string) => {
  try {
    const result = await pool.query(
      `
      select	'benefit' as type,
                ben.description
      from 	    app.product pro
                  inner join app.productassistance pas on pro.id = pas.product_id
                  inner join app.assistancebenefit ben on pas.assistance_id = ben.assistance_id
      where	    pas.assistance_id = $1
      union     all
      select	'exclusion' as type,
                exc.description
      from 	    app.product pro
                  inner join app.productassistance pas on pro.id = pas.product_id
                  inner join app.assistanceexclusion exc on pas.assistance_id = exc.assistance_id
      where	    pas.assistance_id = $1`,
      [assistance_id]
    );

    type RowT = {
      type: string;
      description: string;
    };

    type DataT = {
      benefits: string[];
      exclusions: string[];
    };

    const data: DataT = {
      benefits: [],
      exclusions: [],
    };

    result.rows.map((row: RowT) => {
      if (row.type === "benefit") {
        data.benefits.push(row.description);
      } else {
        data.exclusions.push(row.description);
      }
    });

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getAllBenefits: any = async () => {
  try {
    const result = await pool.query(
      `
      select	  DISTINCT
                pas.assistance_id,
                'benefit' as type,
                ben.description
      from 	    app.productassistance pas
                  inner join app.assistancebenefit ben on pas.assistance_id = ben.assistance_id
      union     all
      select	  DISTINCT
                pas.assistance_id,
                'exclusion' as type,
                exc.description
      from 	    app.productassistance pas
                  inner join app.assistanceexclusion exc on pas.assistance_id = exc.assistance_id`
    );

    type RowT = {
      assistance_id: string;
      type: string;
      description: string;
    };

    type RowDataT = {
      assistance_id: string;
      description: string;
    };

    type DataT = {
      benefits: RowDataT[];
      exclusions: RowDataT[];
    };

    const data: DataT = {
      benefits: [],
      exclusions: [],
    };

    result.rows.map((row: RowT) => {
      if (row.type === "benefit") {
        data.benefits.push({
          assistance_id: row.assistance_id,
          description: row.description,
        });
      } else {
        data.exclusions.push({
          assistance_id: row.assistance_id,
          description: row.description,
        });
      }
    });

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const create: any = async (
  family_id: string,
  name: string,
  description: string
) => {
  try {
    const arrayValues = [family_id, name, description];

    const resultAssistance = await pool.query(
      "SELECT id FROM app.assistance WHERE name = $1",
      [name]
    );

    let query: string;
    if (resultAssistance.rows.length > 0) {
      query =
        "UPDATE app.assistance SET family_id = $1, description = $3 WHERE name = $2 RETURNING *";
    } else {
      query =
        "INSERT INTO app.assistance(family_id, name, description) VALUES ($1, $2, $3) RETURNING *";
    }

    const result = await pool.query(query, arrayValues);
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const updateById: any = async (
  id: string,
  family_id: string,
  name: string,
  description: string
) => {
  try {
    const result = await pool.query(
      "UPDATE app.assistance SET family_id = $2, name = $3, description = $4 WHERE id = $1 RETURNING *",
      [id, family_id, name, description]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const deleteById: any = async (id: string) => {
  try {
    const result = await pool.query(
      "UPDATE app.assistance SET isActive = false WHERE id = $1 RETURNING *",
      [id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getAll = async () => {
  try {
    const result = await pool.query(`
        select  asi.id,
                fam.id as family_id,
                fam.icon as family_icon,
                fam.name as family_name,
                asi.name as name
        from    app.family fam inner join app.assistance asi on fam.id = asi.family_id
        order 	by
                fam.name,
                asi.name`);

    const data = result.rows.map((item: any) => {
      return {
        id: item.id,
        name: item.name,
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

const getById = async (id: string) => {
  try {
    const result = await pool.query(
      ` select	asi.id,
                fam.id as family_id,
                fam.icon as family_icon,
                fam.name as family_name,
                asi.name as name,
                asi.description
        from    app.family fam inner join app.assistance asi on fam.id = asi.family_id
        where   asi.id = $1
        order 	by
                fam.name,
                asi.name`,
      [id]
    );

    const { name, description, family_id, family_icon, family_name } =
      result.rows[0];

    const data = {
      id,
      name,
      description,
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
        from    app.family fam inner join app.assistance asi on fam.id = asi.family_id
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
        select  asi.id,
                fam.id as family_id,
                fam.icon as family_icon,
                fam.name as family_name,
                asi.name as name
        from    app.family fam inner join app.assistance asi on fam.id = asi.family_id
        where   fam.id = $1
        order 	by
                fam.name,
                asi.name`,
      [family_id]
    );

    const data = result.rows.map((item: any) => {
      return {
        id: item.id,
        name: item.name,
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

export {
  getByAssistanceId,
  getAllBenefits,
  create,
  updateById,
  deleteById,
  getAll,
  getById,
  getFamilies,
  getByFamilyId,
};
