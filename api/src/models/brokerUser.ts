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

export { getByBrokerId };
