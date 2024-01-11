import bcrypt from 'bcrypt';
import pool from "../util/database";

const create: any = async (email: string, password: string) => {
  try {

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await pool.query(
      "INSERT INTO app.integrationusers (email, password_hash, salt) VALUES ($1, $2, $3) RETURNING  email",
      [email, hashedPassword, salt]
    );

    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create };