import { fetchClerkUser } from "../util/clerkUserData";
import pool from "../util/database";

const getByBrokerId = async (brokerId: number) => {
  try {
    const result = await pool.query(
      `SELECT * FROM app.brokeruser WHERE broker_id = $1`,
      [brokerId]
    );

    const brokerUsers = await Promise.all(
      result.rows.map(async (brokerUser) => {
        const clerkUser = await fetchClerkUser(brokerUser.user_id);
        return { ...brokerUser, user: clerkUser };
      })
    );

    return { success: true, data: brokerUsers };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const updateProfileCode = async (
  agentId: string,
  brokerId: string,
  profileCode: string,
  email: string,
  rut: string,
  maternallastname: string,
  paternallastname: string,
  district: string,
  name: string,
) => {
  try {
   
    const existingUser = await pool.query(
      `SELECT * FROM app.brokeruser 
       WHERE user_id = $1 AND broker_id = $2`,
      [agentId, brokerId]
    );
    if (existingUser.rows.length === 0) {
      const result = await pool.query(
        `INSERT INTO app.brokeruser 
         (user_id, broker_id, profilecode, email, rut, maternallastname, paternallastname, district, name) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        [agentId, brokerId, profileCode, email, rut, maternallastname, paternallastname, district, name]
      );

      return { success: true, data: result.rows[0] };
    } else {
      const result = await pool.query(
        `UPDATE app.brokeruser 
         SET profilecode = $1, email = $2, rut = $3, maternallastname = $4, paternallastname = $5, district = $6, name = $7  
         WHERE user_id = $8 AND broker_id = $9`,
        [profileCode, email, rut, maternallastname, paternallastname, district, name, agentId, brokerId]
      );

      return { success: true, data: result.rows[0] };
    }
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const removeByUserId = async (userId: string, agentId:string) => {
  try {
    const result = await pool.query(
      `DELETE FROM app.brokeruser WHERE user_id = $1 AND broker_id = $2`,
      [userId, agentId]
    );

    return { success: true, data: result.rows[0] };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
}



export { getByBrokerId, updateProfileCode, removeByUserId };
