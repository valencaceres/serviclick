import pool from "../util/database";

const create: any = async (
  rut: string,
  name: string,
  paternalLastName: string,
  maternalLastName: string,
  birthDate: string,
  address: string,
  district: string,
  email: string,
  phone: string
) => {
  try {
    const arrayValues = [
      rut,
      name,
      paternalLastName || "",
      maternalLastName || "",
      birthDate,
      address || "",
      district || "",
      email,
      phone || "",
    ];

    const resultInsured = await pool.query(
      "SELECT 1 FROM app.insured WHERE rut = $1",
      [rut]
    );

    let query: string;
    if (resultInsured.rows.length > 0) {
      query = `
        UPDATE  app.insured
        SET     name = $2,
                paternallastname = $3,
                maternallastname = $4,
                birthdate = $5,
                address = $6,
                district = $7,
                email = $8,
                phone = $9 
        WHERE   rut = $1 RETURNING *`;
    } else {
      query = `
            INSERT   INTO app.insured(
                    rut,
                    name,
                    paternallastname,
                    maternallastname,
                    birthdate,
                    address,
                    district,
                    email,
                    phone) 
            VALUES( $1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
    }

    const result = await pool.query(query, arrayValues);

    const data = {
      id: result.rows[0].id,
      rut: result.rows[0].rut,
      name: result.rows[0].name,
      paternalLastName: result.rows[0].paternallastname,
      maternalLastName: result.rows[0].maternallastname,
      birthDate: result.rows[0].birthdate,
      address: result.rows[0].address,
      district: result.rows[0].district,
      email: result.rows[0].email,
      phone: result.rows[0].phone,
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
              paternallastname,
              maternallastname,
              to_char(birthdate, 'YYYY-MM-DD') AS birthdate,
              address,
              district,
              email,
              phone
      FROM    app.insured
      WHERE   rut = $1`,
      [rut]
    );

    if (result.rows.length > 0) {
      const data = {
        id: result.rows[0].id,
        rut: result.rows[0].rut,
        name: result.rows[0].name,
        paternalLastName: result.rows[0].paternallastname,
        maternalLastName: result.rows[0].maternallastname,
        birthDate: result.rows[0].birthdate,
        address: result.rows[0].address,
        district: result.rows[0].district,
        email: result.rows[0].email,
        phone: result.rows[0].phone,
      };
      return { success: true, data, error: null };
    } else {
      return { success: false, data: null, error: "No data found" };
    }
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getById: any = async (id: string) => {
  try {
    const result = await pool.query(
      `
      SELECT  rut,
              name,
              paternallastname,
              maternallastname,
              to_char(birthdate, 'YYYY-MM-DD') AS birthdate,
              address,
              district,
              email,
              phone
      FROM    app.insured
      WHERE   id = $1`,
      [id]
    );

    const {
      rut,
      name,
      paternallastname,
      maternallastname,
      birthdate,
      address,
      district,
      email,
      phone,
    } = result.rows[0];

    const data = {
      id,
      rut,
      name,
      paternalLastName: paternallastname,
      maternalLastName: maternallastname,
      birthDate: birthdate,
      address,
      district,
      email,
      phone,
    };

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getProfile: any = async (rut: string) => {
  try {
    const result = await pool.query(`SELECT app.insured_profile($1)`, [rut]);
 
    return {
      success: true,
      data: result.rows[0].insured_profile,
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const upsert: any = async (
  rut: string,
  name: string,
  paternalLastName: string,
  maternalLastName: string,
  address: string,
  district: string,
  email: string,
  phone: string,
  birthDate: string
) => {
  try {
    const arrayValues = [
      rut,
      name,
      paternalLastName,
      maternalLastName,
      address,
      district,
      email,
      phone,
      birthDate,
    ];

    const resultInsured = await pool.query(
      `SELECT app.insured_upsert($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      arrayValues
    );

    return { success: true, data: resultInsured.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getByRutOrName: any = async (
  rut: string,
  name: string,
  records: number,
  page: number
) => {
  try {
    const result = await pool.query(
      `select app.report_insured_get_all($1, $2, $3, $4)`,
      [rut, name, records, page]
    );

    return {
      success: true,
      data: result.rows.length > 0 ? result.rows[0].report_insured_get_all : [],
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create, getByRut, getById, getProfile, upsert, getByRutOrName };
