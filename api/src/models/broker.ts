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

export {
  create,
  getById,
  getByRut,
  getAll,
  updateLogo,
  deleteById,
  getFamiliesByBrokerId,
  getProductsByBrokerIdAndFamilyId,
};
