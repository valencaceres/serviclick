import bcrypt from "bcrypt";

import pool from "../util/database";

const create: any = async (id: string, email: string) => {
  try {
    const resultUserExists = await pool.query(
      "SELECT id, person_id, login FROM app.user WHERE login = $1",
      [email]
    );

    if (resultUserExists.rows.length === 0) {
      const result = await pool.query(
        "INSERT INTO app.user(person_id, login) VALUES ($1, $2) RETURNING *",
        [id, email]
      );
      return { success: true, data: result.rows[0], error: null };
    } else {
      return { success: true, data: resultUserExists.rows[0], error: null };
    }
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const assignPassword: any = async (id: string, password: string) => {
  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    await pool.query("UPDATE app.user SET hash = $2 WHERE id = $1", [id, hash]);

    return { success: true, data: "Password modificada", error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const validate: any = async (values: any) => {
  const { login, password } = values;
  try {
    const result = await pool.query(
      `SELECT PER.rut,
              PER.name,
              PER.paternalLastName,
              PER.maternalLastName,
              PER.email,
              PER.phone,
              USR.hash
       FROM   app.user USR INNER JOIN app.person PER ON USR.person_id = PER.id
       WHERE  USR.login = $1`,
      [login]
    );

    const {
      id,
      rut,
      name,
      paternalLastName,
      maternalLastName,
      email,
      phone,
      hash,
    } = result.rows[0];
    const isValid = await bcrypt.compare(password, hash);

    return {
      success: true,
      data: {
        id,
        rut,
        name,
        paternalLastName,
        maternalLastName,
        email,
        phone,
        isValid,
      },
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create, assignPassword, validate };
