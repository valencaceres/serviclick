import bcrypt from "bcryptjs";

import connection from "../utils/database";

import * as IUser from "../interfaces/user";

const getById = async (id: string): Promise<IUser.User | null> => {
  const response = await connection.query(
    `SELECT app.integrationuser_get_by_id($1)`,
    [id]
  );
  return response.rowCount ? response.rows[0].integrationuser_get_by_id : null;
};

const getByEmail = async (email: string): Promise<IUser.User | null> => {
  const response = await connection.query(
    `SELECT app.integrationuser_get_by_email($1)`,
    [email]
  );
  return response.rowCount
    ? response.rows[0].integrationuser_get_by_email
    : null;
};

const upsert = async (
  email: string,
  name: string,
  retailId: string
): Promise<IUser.User> => {
  const response = await connection.query(
    ` SELECT app.integrationuser_upsert($1, $2, $3)`,
    [email, name, retailId]
  );
  return response.rowCount ? response.rows[0].integrationuser_upsert : null;
};

const updatePassword = async (
  id: string,
  password: string
): Promise<IUser.User> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const response = await connection.query(
    `SELECT app.integrationuser_update_password($1, $2)`,
    [id, hashedPassword]
  );
  return response.rowCount
    ? response.rows[0].integrationuser_update_password
    : null;
};

export { getById, getByEmail, upsert, updatePassword };
