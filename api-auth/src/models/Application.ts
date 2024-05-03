import db from "../utils/database";
import createLogger from "../utils/logger";

import {
  _getAll,
  _getById,
  _getByCode,
  _upsert,
  _deleteById,
} from "../queries/aplication";

const getAll: any = async () => {
  try {
    createLogger.info({
      model: "aplication/getAll",
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
      model: "aplication/getById",
      input: { id },
    });
    const result = await db.query(_getById, [id]);

    return result.rows[0];
  } catch (e) {
    return (e as Error).message;
  }
};

const getByCode: any = async (code: string) => {
  try {
    createLogger.info({
      model: "aplication/getByCode",
      input: { code },
    });
    const result = await db.query(_getByCode, [code]);

    return result.rows[0];
  } catch (e) {
    return (e as Error).message;
  }
};

const upsert: any = async (code: string, name: string) => {
  try {
    createLogger.info({
      model: "aplication/upsert",
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
      model: "aplication/deleteById",
      input: { id },
    });
    const result = await db.query(_deleteById, [id]);

    return result.rows;
  } catch (e) {
    return (e as Error).message;
  }
};

export { getAll, getById, getByCode, upsert, deleteById };
