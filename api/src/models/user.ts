import bcrypt from "bcrypt";

import pool from "../util/database";

const create: any = async (person_id: string, email: string) => {
  try {
    const resultUserExists = await pool.query(
      "SELECT id, person_id, login FROM app.user WHERE login = $1",
      [email]
    );

    if (resultUserExists.rows.length === 0) {
      const result = await pool.query(
        "INSERT INTO app.user(person_id, login) VALUES ($1, $2) RETURNING *",
        [person_id, email]
      );

      const { id, login, isactive, type } = result.rows[0];

      const data = {
        id,
        login,
        isActive: isactive,
        type,
      };

      return { success: true, data, error: null };
    } else {
      const { id, login, isactive, type } = resultUserExists.rows[0];

      const data = {
        id,
        login,
        isActive: isactive,
        type,
      };

      return { success: true, data, error: null };
    }
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const deleteUserById: any = async (id: string) => {
  try {
    const resultUserExists = await pool.query(
      "UPDATE app.user SET isValid = false WHERE id = $1",
      [id]
    );
    return { success: true, data: { deleted: true }, error: null };
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

const getByRut: any = async (rut: string) => {
  try {
    const result = await pool.query(
      `SELECT USR.id,
              PER.rut,
              PER.name,
              PER.paternalLastName,
              PER.maternalLastName,
              PER.email,
              PER.phone,
              USR.hash
       FROM   app.user USR INNER JOIN app.person PER ON USR.person_id = PER.id
       WHERE  PER.rut = $1`,
      [rut]
    );

    const { id, email, name, paternallastname, maternallastname, phone, hash } =
      result.rows[0];

    return {
      success: true,
      data: {
        id,
        rut,
        name,
        paternalLastName: paternallastname,
        maternalLastName: maternallastname,
        email,
        phone,
        hash,
      },
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getByEmail: any = async (email: string) => {
  try {
    const result = await pool.query(
      `SELECT USR.id,
              PER.rut,
              PER.name,
              PER.paternalLastName,
              PER.maternalLastName,
              PER.email,
              PER.phone,
              USR.hash
       FROM   app.user USR INNER JOIN app.person PER ON USR.person_id = PER.id
       WHERE  USR.login = $1`,
      [email]
    );

    const { id, rut, name, paternallastname, maternallastname, phone, hash } =
      result.rows[0];

    return {
      success: true,
      data: {
        id,
        rut,
        name,
        paternalLastName: paternallastname,
        maternalLastName: maternallastname,
        email,
        phone,
        hash,
      },
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getAll: any = async () => {
  try {
    const result = await pool.query(
      `SELECT USR.id,
              PER.rut,
              PER.name,
              PER.paternalLastName,
              PER.maternalLastName,
              PER.email,
              PER.phone,
              USR.hash
       FROM   app.user USR INNER JOIN app.person PER ON USR.person_id = PER.id
       WHERE  USR.isvalid is true`
    );

    const data =
      result.rows.length > 0
        ? result.rows.map((item: any) => {
            const {
              id,
              rut,
              email,
              name,
              paternallastname,
              maternallastname,
              phone,
            } = item;
            return {
              id,
              rut,
              name,
              paternalLastName: paternallastname,
              maternalLastName: maternallastname,
              email,
              phone,
            };
          })
        : [];

    return {
      success: true,
      data,
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create, assignPassword, deleteUserById, getByRut, getByEmail, getAll };
