import bcrypt from 'bcrypt';
import pool from "../util/database";

const createToken: any = async (retail_id: string, email: string, password: string) => {
  try {
    // Verificar las credenciales
    const loginResult = await pool.query(
      "SELECT email, password_hash FROM app.integrationusers WHERE email = $1",
      [email]
    );

    if (loginResult.rows.length === 0) {
      return { success: false, data: null, error: "Invalid email or password" };
    }

    const user = loginResult.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return { success: false, data: null, error: "Invalid email or password" };
    }

    const result = await pool.query(
      "INSERT INTO app.integrationtoken (email, agent_id) VALUES ($1, $2) RETURNING email, token, agent_id",
      [email, retail_id]
    );

    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { createToken };