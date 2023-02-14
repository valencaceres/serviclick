import pool from "../util/database";

const create: any = async (specialist_id: string, specialty_id: string) => {
  try {
    const result = await pool.query(
      "INSERT INTO app.specialistspecialty(specialist_id, specialty_id) VALUES ($1, $2) RETURNING *",
      [specialist_id, specialty_id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const deleteBySpecialistId: any = async (id: string) => {
  try {
    const result = await pool.query(
      "DELETE FROM app.specialistspecialty WHERE specialist_id = $1 RETURNING *",
      [id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getBySpecialistId: any = async (specialist_id: string) => {
  try {
    const result = await pool.query(
      `select spe.id,
              fam.id as family_id,
              fam.name as family_name,
              spe.name
       from   app.specialistspecialty asi
                inner join app.specialty spe on asi.specialty_id = spe.id
                inner join app.family fam on spe.family_id = fam.id
       where  asi.specialist_id = $1
       order  by
              spe.name`,
      [specialist_id]
    );

    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create, deleteBySpecialistId, getBySpecialistId };
