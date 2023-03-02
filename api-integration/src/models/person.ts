import pool from "../utils/database";

const create: any = async (
  rut: string,
  name: string,
  paternalLastName: string,
  maternalLastName: string,
  address: string,
  district: string,
  country_code: string,
  email: string,
  phone: string
) => {
  try {
    const arrayValues = [
      rut,
      name,
      paternalLastName,
      maternalLastName,
      address,
      district,
      country_code,
      email,
      phone,
    ];

    const resultPerson = await pool.query(
      "SELECT 1 FROM integration.person WHERE rut = $1",
      [rut]
    );

    let query: string;
    if (resultPerson.rows.length > 0) {
      query = `
        UPDATE  integration.person
        SET     name = $2,
                paternallastname = $3,
                maternallastname = $4,
                address = $5,
                district = $6,
                country_code = $7,
                email = $8,
                phone = $9
        WHERE   rut = $1 RETURNING *`;
    } else {
      query = `
        INSERT  INTO integration.person(
                rut,
                name,
                paternallastname,
                maternallastname,
                address,
                district,
                country_code,
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
      address: result.rows[0].address,
      district: result.rows[0].district,
      country_code: result.rows[0].country_code,
      email: result.rows[0].email,
      phone: result.rows[0].phone,
    };

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const remove: any = async (rut: string) => {
  try {
    const arrayValues = [rut];

    const query = `
        UPDATE  integration.person
        SET     isactive = $0
        WHERE   rut = $1 RETURNING *`;
    const result = await pool.query(query, arrayValues);

    const data = {
      id: result.rows[0].id,
      rut: result.rows[0].rut,
      name: result.rows[0].name,
      paternalLastName: result.rows[0].paternallastname,
      maternalLastName: result.rows[0].maternallastname,
      address: result.rows[0].address,
      district: result.rows[0].district,
      country_code: result.rows[0].country_code,
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
              address,
              district,
              country_code,
              email,
              phone
      FROM    integration.person
      WHERE   rut = $1`,
      [rut]
    );

    const {
      id,
      name,
      paternallastname,
      maternallastname,
      address,
      district,
      country_code,
      email,
      phone,
    } = result.rows[0] || {
      id: "",
      name: "",
      paternallastname: "",
      maternallastname: "",
      address: "",
      district: "",
      country_code: "",
      email: "",
      phone: "",
    };

    const data = {
      id,
      rut,
      name,
      paternalLastName: paternallastname,
      maternalLastName: maternallastname,
      address,
      district,
      country_code,
      email,
      phone,
    };

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create, remove, getByRut };
