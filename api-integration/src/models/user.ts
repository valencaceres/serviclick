import bcrypt from "bcrypt";
import pool from "../util/database";

const create: any = async (
  name: string,
  email: string,
  retail_id: string,
  password: string
) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await pool.query(
      "INSERT INTO app.integrationuser(name, email, retail_id, hash) VALUES ($1, $2, $3, $4) RETURNING  email",
      [name, email, retail_id, hashedPassword]
    );

    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create };
