import { query } from "winston";
import pool from "../util/database";

const createFamilyValue: any = async (family_id: string, value: any) => {
  try {
    const { id, name } = value;
    let resultQuery: any;

    if (id !== "") {
      console.log({ type: 1, family_id, id, name });
      resultQuery = await pool.query(
        "INSERT INTO app.familyValue(id, family_id, name) VALUES ($1, $2, $3) RETURNING *",
        [id, family_id, name]
      );
    } else {
      console.log({ type: 2, family_id, name });
      resultQuery = await pool.query(
        "INSERT INTO app.familyValue(family_id, name) VALUES ($1, $2) RETURNING *",
        [family_id, name]
      );
    }

    return { success: true, data: resultQuery.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const deleteFamilyValues: any = async (family_id: string) => {
  try {
    const result = await pool.query(
      "DELETE FROM app.familyValue WHERE family_id = $1",
      [family_id]
    );
    return { success: true, data: true, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const listFamilyValues: any = async (family_id: string) => {
  try {
    const result = await pool.query(
      "SELECT id, name FROM app.familyValue WHERE family_id = $1 ORDER BY name",
      [family_id]
    );
    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { createFamilyValue, deleteFamilyValues, listFamilyValues };
