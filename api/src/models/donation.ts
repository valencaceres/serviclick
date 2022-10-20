import { format } from "date-fns";

import pool from "../util/database";

const createModel: any = async (
  donor_id: string,
  product_id: string,
  price: number,
  agent_id: string
) => {
  try {
    const createDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const result = await pool.query(
      `
        INSERT  INTO app.donation(
                createdate,
                donor_id,
                product_id,
                price,
                agent_id) 
        VALUES( $1, $2, $3, $4 $5) RETURNING *`,
      [createDate, donor_id, product_id, price, agent_id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getByIdModel: any = async (id: string) => {
  try {
    const result = await pool.query(
      `
        SELECT  DISTINCT
                DON.id,
                DON.createdate,
                DNN.id AS donor_id,
                CASE WHEN DNN.rut IS NULL THEN '' ELSE DNN.rut END AS donor_rut,
                CASE WHEN DNN.name IS NULL THEN '' ELSE DNN.name END AS donor_name,
                CASE WHEN DNN.paternallastname IS NULL THEN '' ELSE DNN.paternallastname END AS donor_paternallastname,
                CASE WHEN DNN.maternallastname IS NULL THEN '' ELSE DNN.maternallastname END AS donor_maternallastname,
                to_char(DNN.birthdate, 'YYYY-MM-DD') AS donor_birthdate,
                CASE WHEN DNN.address IS NULL THEN '' ELSE DNN.address END AS donor_address,
                CASE WHEN DNN.district IS NULL THEN '' ELSE DNN.district END AS donor_district,
                CASE WHEN DNN.email IS NULL THEN '' ELSE DNN.email END AS donor_email,
                CASE WHEN DNN.phone IS NULL THEN '' ELSE DNN.phone END AS donor_phone,
                DON.subscription_id
        FROM    app.donation DON LEFT OUTER JOIN app.donor DNN ON DON.donor_id = DNN.id
        WHERE   DON.id = $1`,
      [id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getBySubscriptionIdModel: any = async (subscription_id: string) => {
  try {
    const result = await pool.query(
      `
        SELECT  DISTINCT
                DON.id,
                DON.createdate,
                DNN.id AS donor_id,
                CASE WHEN DNN.rut IS NULL THEN '' ELSE DNN.rut END AS donor_rut,
                CASE WHEN DNN.name IS NULL THEN '' ELSE DNN.name END AS donor_name,
                CASE WHEN DNN.paternallastname IS NULL THEN '' ELSE DNN.paternallastname END AS donor_paternallastname,
                CASE WHEN DNN.maternallastname IS NULL THEN '' ELSE DNN.maternallastname END AS donor_maternallastname,
                to_char(DNN.birthdate, 'YYYY-MM-DD') AS donor_birthdate,
                CASE WHEN DNN.address IS NULL THEN '' ELSE DNN.address END AS donor_address,
                CASE WHEN DNN.district IS NULL THEN '' ELSE DNN.district END AS donor_district,
                CASE WHEN DNN.email IS NULL THEN '' ELSE DNN.email END AS donor_email,
                CASE WHEN DNN.phone IS NULL THEN '' ELSE DNN.phone END AS donor_phone,
                DON.subscription_id,
        FROM    app.donation LEA LEFT OUTER JOIN app.donor CUS ON DON.donor_id = DNN.id
        WHERE   DON.subscription_id = $1`,
      [subscription_id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { createModel, getByIdModel, getBySubscriptionIdModel };
