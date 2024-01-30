import bcrypt from "bcrypt";
import pool from "../util/database";

const createToken: any = async (
  retail_id: string,
  email: string,
  password: string
) => {
  try {
    const loginResult = await pool.query(
      "SELECT id, email, hash FROM app.integrationuser WHERE email = $1",
      [email]
    );

    if (loginResult.rows.length === 0) {
      return { success: false, data: null, error: "Invalid email or password" };
    }

    const user = loginResult.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.hash);

    if (!isPasswordValid) {
      return { success: false, data: null, error: "Invalid email or password" };
    }

    const { id: integrationuser_id } = loginResult.rows[0];

    const result = await pool.query(
      "INSERT INTO app.integrationtoken(integrationuser_id) VALUES ($1) RETURNING token",
      [integrationuser_id]
    );

    return { success: true, data: result.rows[0].token, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { createToken };
