import pool from "../../util/database";

const createModelGateway: any = async (
    collector_id: string,
    collector_plan_id: string,
    collector_subscription_id: number,
  ) => {
    try {
        let result: any;
  
        result = await pool.query(
          `
            INSERT  INTO app.gateway_subscription(
            collector_id,
            collector_plan_id,
            collector_subscription_id  
            )
            VALUES  ($1, $2, $3)
            RETURNING *`,
          [ collector_id, collector_plan_id, collector_subscription_id ]
        );
      return { success: true, data: result.rows[0], error: null };
    } catch (e) {
      return { success: false, data: null, error: (e as Error).message };
    }
  };
  
  const getCollector: any = async (collector: string) => {
    try {
      const result = await pool.query(`
          select id as collector_id from app.gateway_collector where alias = $1
        `, 
      [collector])
        return { success: true, data: result.rows[0], error: null };
    } catch (e) {
      return { success: false, data: null, error: (e as Error).message };
    }
  }

  export {getCollector, createModelGateway}