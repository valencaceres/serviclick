import pool from "../util/database";

const create: any = async (
  rut: string,
  name: string,
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
                line = $3,
                fantasyname = $4,
                address = $5,
                district = $6,
                email = $7,
                phone = $8,
                logo = $9,
                isactive = true
        WHERE   rut = $1 RETURNING *`;
    } else {
      query = `
        INSERT  INTO app.retail(
                rut,
                name,
                line,
                fantasyname,
                address,
                district,
                email,
                phone,
                logo) 
        VALUES( $1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
    }

    const result = await pool.query(query, arrayValues);
    const { id } = result.rows[0];

    const { data } = await getById(id);

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getById: any = async (id: string) => {
  try {
    const result = await pool.query(
      `
        SELECT  ret.id,
                ret.rut,
                ret.name,
                ret.line,
                ret.fantasyname,
                ret.address,
                ret.district,
                ret.email,
                ret.phone,
                ret.logo,
                leg.rut as legalrepresentative_rut,
                leg.name as legalrepresentative_name
        FROM    app.retail ret
                  left outer join app.retaillegalrepresentative leg on ret.id = leg.retail_id
        WHERE   ret.id = $1
        ORDER   BY
                leg.name`,
      [id]
    );

    const {
      rut,
      name,
      line,
      fantasyname,
      address,
      district,
      email,
      phone,
      logo,
    } = result.rows[0] || {};

    const data = {
      id,
      rut,
      name,
      line,
      fantasyName: fantasyname,
      address,
      district,
      email,
      phone,
      logo,
      legalRepresentatives: result.rows.map((item: any) => {
        return {
          rut: item.legalrepresentative_rut,
          name: item.legalrepresentative_name,
        };
      }),
    };

    return { success: true, data, error: null };
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
      line,
      fantasyname,
      address,
      district,
      email,
      phone,
      logo,
    } = result.rows[0] || {};

    const data = {
      id,
      rut,
      name,
      line,
      fantasyName: fantasyname,
      address,
      district,
      email,
      phone,
      logo,
      legalRepresentatives: result.rows.map((item: any) => {
        return {
          rut: item.legalrepresentative_rut,
          name: item.legalrepresentative_name,
        };
      }),
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
        where	  bpr.retail_id = $1`,
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
                bpr.companyprice
        from    app.product pro
                  inner join app.family fam on pro.family_id = fam.id
                  inner join app.retailproduct bpr on pro.id = bpr.product_id
        where   bpr.retail_id = $1 and
                fam.id = $2`,
      [id, family_id]
    );

    const data = result.rows.map((row) => {
      const { id, name, companyprice, currency, frequency } = row;
      return {
        id,
        name,
        currency,
        frequency,
        price: { C: companyprice },
      };
    });

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export {
  create,
  getById,
  getByRut,
  getAll,
  updateLogo,
  deleteById,
  getFamiliesByRetailId,
  getProductsByRetailIdAndFamilyId,
};
