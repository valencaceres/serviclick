import pool from "../util/database";

const createModel: any = async (
  rut: string,
  name: string,
  paternalLastName: string,
  maternalLastName: string,
  address: string,
  district: string,
  email: string,
  phone: string,
  beneficiary: any
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
    ];

    const resultCustomer = await pool.query(
      "SELECT 1 FROM app.customer WHERE rut = $1",
      [rut]
    );

    let query: string;
    if (resultCustomer.rows.length > 0) {
      query = `
        UPDATE  app.customer
        SET     name = $2,
                paternallastname = $3,
                maternallastname = $4,
                address = $5,
                district = $6,
                email = $7,
                phone = $8 
        WHERE   rut = $1 RETURNING *`;
    } else {
      query = `
            INSERT   INTO app.customer(
                    rut,
                    name,
                    paternallastname,
                    maternallastname,
                    address,
                    district,
                    email,
                    phone) 
            VALUES( $1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
    }
    const result = await pool.query(query, arrayValues);

    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { createModel };
