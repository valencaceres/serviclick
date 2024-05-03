import db from "../utils/database";
import createLogger from "../utils/logger";

import { _getAll, _getById, _upsert, _deleteById } from "../queries/rol";

const getAll: any = async () => {
  try {
    createLogger.info({
      model: "rol/getAll",
    });
    let result = await db.query(_getAll);
    return result.rows;
  } catch (e) {
    return (e as Error).message;
  }
};

const getById: any = async (id: string) => {
  try {
    createLogger.info({
      model: "rol/getById",
      input: { id },
    });
    const result = await db.query(_getById, [id]);
    return result.rows[0];
  } catch (e) {
    return (e as Error).message;
  }
};

const upsert: any = async (code: string, name: string) => {
  try {
    createLogger.info({
      model: "rol/upsert",
      input: { code, name },
    });
    const result = await db.query(_upsert, [code, name]);

    return result.rows;
  } catch (e) {
    return (e as Error).message;
  }
};

const deleteById: any = async (id: string) => {
  try {
    createLogger.info({
      model: "rol/deleteById",
      input: { id },
    });
    const result = await db.query(_deleteById, [id]);
    return result.rows;
  } catch (e) {
    return (e as Error).message;
  }
};

export { getAll, getById, upsert, deleteById };
