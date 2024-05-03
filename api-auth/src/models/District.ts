import db from "../utils/database";
import createLogger from "../utils/logger";

import { _getAll, _getById } from "../queries/district";

const getAll: any = async () => {
  try {
    createLogger.info({
      model: "district/getAll",
    });
    let result = await db.query(_getAll);
    return result.rows;
  } catch (e) {
    return (e as Error).message
  }
};

const getById: any = async (id: string) => {
  try {
    createLogger.info({
      model: "district/getById",
      input: { id },
    });
    const result = await db.query(_getById);

    return result.rows[0];
  } catch (e) {
    return (e as Error).message
  }
};

export { getAll, getById };
