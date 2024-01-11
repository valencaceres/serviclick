import pool from "../util/database";
import { _getByRut } from "../queries/beneficiary";

const getByRut: any = async (
    rut: string,   
  ) => {
    try {
  
      const beneficiaryResult = await pool.query(_getByRut, [
      rut  
      ]);
      return {
        success: true,
        data: beneficiaryResult.rows[0].integration_customer_get_by_rut,
        error: null,
      };
    } catch (e) {
      return { success: false, data: null, error: (e as Error).message };
    }
  };

  export { getByRut}