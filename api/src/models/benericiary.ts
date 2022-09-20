import pool from "../util/database";

const createModel: any = async (
  rut: string,
  name: string,
  paternalLastName: string,
  maternalLastName: string,
  email: string,
  phone: string
) => {
  try {
    const arrayValues = [
      rut,
      name,
      paternalLastName,
      maternalLastName,
      email,
      phone,
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
                email = $5,
                phone = $6 
        WHERE   rut = $1 RETURNING *`;
    } else {
      query = `
            INSERT  INTO app.beneficiary(
                    rut,
                    name,
                    paternallastname,
                    maternallastname,
                    email,
                    phone) 
            VALUES( $1, $2, $3, $4, $5, $6) RETURNING *`;
    }
    const result = await pool.query(query, arrayValues);

    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { createModel };
