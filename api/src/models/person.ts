import pool from "../util/database";

const create: any = async (
  rut: string,
  name: string,
  paternalLastName: string,
  maternalLastName: string,
  email: string,
  phone: string
) => {
  try {
    const result = await pool.query(
      "INSERT INTO app.person(rut, name, paternalLastName, maternalLastName, email, phone) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [rut, name, paternalLastName, maternalLastName, email, phone]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create };
