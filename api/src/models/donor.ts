import pool from "../util/database";

const createModel: any = async (
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
      paternalLastName,
      maternalLastName,
      birthDate,
      address,
      district,
      email,
      phone,
    ];

    const resultDonor = await pool.query(
      "SELECT 1 FROM app.donor WHERE rut = $1",
      [rut]
    );

    let query: string;
    if (resultDonor.rows.length > 0) {
      query = `
        UPDATE  app.donor
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
            INSERT   INTO app.donor(
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

const getByRutModel: any = async (rut: string) => {
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
      FROM    app.donor
      WHERE   rut = $1`,
      [rut]
    );

    const data =
      result.rows.length > 0
        ? {
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
          }
        : {};

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { createModel, getByRutModel };
