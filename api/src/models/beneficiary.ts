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
  phone: string,
  relationship?: string
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
      relationship,
    ];

    const resultBeneficiary = await pool.query(
      "SELECT 1 FROM app.beneficiary WHERE rut = $1",
      [rut]
    );

    let query: string;
    if (resultBeneficiary.rows.length > 0) {
      query = `
        UPDATE  app.beneficiary
        SET     name = $2,
                paternallastname = $3,
                maternallastname = $4,
                birthdate = $5,
                address = $6,
                district = $7,
                email = $8,
                phone = $9,
                relationship = $10
        WHERE   rut = $1 RETURNING *`;
    } else {
      query = `
            INSERT  INTO app.beneficiary(
                    rut,
                    name,
                    paternallastname,
                    maternallastname,
                    birthdate,
                    address,
                    district,
                    email,
                    phone,
                    relationship) 
            VALUES( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;
    }

    const result = await pool.query(query, arrayValues);

    return getByRutModel(result.rows[0].rut);
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
              phone,
              case when relationship is null then '' else relationship end as relationship
      FROM    app.beneficiary
      WHERE   rut = $1`,
      [rut]
    );

    const {
      id,
      name,
      paternallastname,
      maternallastname,
      birthdate,
      address,
      district,
      email,
      phone,
      relationship,
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
      relationship,
    };

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { createModel, getByRutModel };
