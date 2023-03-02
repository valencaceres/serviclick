import pool from "../utils/database";

const create: any = async (person_id: string, birthDate: string) => {
  try {
    const arrayValues = [person_id, birthDate];

    const result = await pool.query(
      "SELECT 1 FROM integration.insured WHERE person_id = $1",
      [person_id]
    );

    let query: string;
    if (result.rows.length > 0) {
      query = `
        UPDATE  integration.insured
        SET     birthDate = $2
        WHERE   person_id = $1 RETURNING *`;
    } else {
      query = `
        INSERT  INTO integration.insured (
                person_id,
                birthDate)
        VALUES ($1, $2) RETURNING *`;
    }

    const resultInsured = await pool.query(query, arrayValues);

    const data = {
      id: resultInsured.rows[0].id,
    };

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const deleteById: any = async (id: string) => {
  try {
    const arrayValues = [id];

    const query = `
        UPDATE  integration.insured
        SET     isactive = false
        WHERE   id = $1 RETURNING *`;
    const resultInsured = await pool.query(query, arrayValues);

    const data = {
      id: resultInsured.rows[0].id,
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
      SELECT  INS.id,
              PER.rut,
              PER.name,
              PER.paternallastname,
              PER.maternallastname,
              PER.address,
              PER.district,
              PER.country_code,
              PER.email,
              PER.phone,
              INS.birthDate
      FROM    integration.person PER
                inner join integration.insured INS ON PER.id = INS.person_id
      WHERE   PER.rut = $1`,
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
      birthDate,
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
      birthDate: "",
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
      birthDate,
    };

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create, deleteById, getByRut };
