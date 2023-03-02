import pool from "../utils/database";

const create: any = async (person_id: string, birthDate: string) => {
  try {
    const arrayValues = [person_id, birthDate];

    const result = await pool.query(
      "SELECT 1 FROM integration.customer WHERE person_id = $1",
      [person_id]
    );

    let resultCustomer: any;

    if (result.rows.length === 0) {
      const query = `
        INSERT  INTO integration.customer (
                person_id)
        VALUES ($1) RETURNING *`;
      resultCustomer = await pool.query(query, arrayValues);
    }

    const data = {
      id: resultCustomer.rows[0].id || "",
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
        UPDATE  integration.customer
        SET     isactive = false
        WHERE   id = $1 RETURNING *`;
    const resultCustomer = await pool.query(query, arrayValues);

    const data = {
      id: resultCustomer.rows[0].id,
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
              PER.phone
      FROM    integration.person PER
                inner join integration.customer INS ON PER.id = INS.person_id
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

export { create, deleteById, getByRut };
