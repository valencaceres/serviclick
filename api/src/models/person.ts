import pool from "../util/database";

const create: any = async (
  rut: string,
  name: string,
  paternalLastName: string,
  maternalLastName: string,
  address: string,
  district: string,
  email: string,
  phone: string,
  birthdate: string
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
      birthdate,
    ];

    const resultPerson = await pool.query(
      "SELECT 1 FROM app.person WHERE rut = $1",
      [rut]
    );

    let query: string;

    if (resultPerson.rows.length > 0) {
      query = `
        UPDATE  app.person
        SET     name = $2,
                paternalLastName = $3,
                maternalLastName = $4,
                address = $5,
                district = $6,
                email = $7,
                phone = $8,
                birthdate = $9
        WHERE   rut = $1 RETURNING *`;
    } else {
      query = `
        INSERT  INTO app.person(
                rut,
                name,
                paternalLastName,
                maternalLastName,
                address,
                district,
                email,
                phone,
                birthdate)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
    }

    const result = await pool.query(query, arrayValues);

    const { id } = result.rows[0];

    const data = {
      id,
      rut,
      name,
      paternalLastName,
      maternalLastName,
      address,
      district,
      email,
      phone,
      birthdate,
    };

    return { success: true, data: data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create };
