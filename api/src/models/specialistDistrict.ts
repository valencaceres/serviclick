import pool from "../util/database";

const create: any = async (specialist_id: string, district_id: string) => {
  try {
    const result = await pool.query(
      "INSERT INTO app.specialistdistrict(specialist_id, district_id) VALUES ($1, $2) RETURNING *",
      [specialist_id, district_id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    console.log(e);
    return { success: false, data: null, error: (e as Error).message };
  }
};

const deleteBySpecialistId: any = async (id: string) => {
  try {
    const result = await pool.query(
      "DELETE FROM app.specialistdistrict WHERE specialist_id = $1 RETURNING *",
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
      `select dis.id,
              dis.district_name
       from   app.specialistdistrict asi inner join app.district dis on asi.district_id = dis.id
       where  asi.specialist_id = $1
       order  by
              dis.district_name`,
      [specialist_id]
    );

    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create, deleteBySpecialistId, getBySpecialistId };
