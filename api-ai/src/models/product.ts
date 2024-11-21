import bcrypt from "bcryptjs";

import connection from "../utils/database";

import * as IProduct from "../interfaces/product";

const getByRut = async (rut: string): Promise<IProduct.productByRut | null> => {
  const response = await connection.query(`SELECT app.product_get_by_rut($1)`, [
    rut,
  ]);
  return response.rowCount ? response.rows[0].product_get_by_rut : null;
};

export { getByRut };
