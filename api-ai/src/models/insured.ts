import connection from "../utils/database";

import * as IInsured from "../interfaces/insured";

const getByRut = async (rut: string): Promise<IInsured.InsuredByRut | null> => {
  const response = await connection.query(`SELECT app.insured_get_by_rut($1)`, [
    rut,
  ]);
  return response.rowCount ? response.rows[0].insured_get_by_rut : null;
};

export { getByRut };
