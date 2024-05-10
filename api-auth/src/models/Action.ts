import db from "../utils/database";
import createLogger from "../utils/logger";

import {
  _getAll,
  _getById,
  _getByCode,
  _getByApplicationId,
  _upsert,
  _deleteById,
} from "../queries/action";

const getAll: any = async () => {
  try {
    createLogger.info({
      model: "action/getAll",
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
      model: "action/getById",
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
      model: "action/getByCode",
      input: { code },
    });
    const result = await db.query(_getByCode, [code]);

    return result.rows[0];
  } catch (e) {
    return (e as Error).message;
  }
};

const getByApplicationId: any = async (application_id: string) => {
  try {
    createLogger.info({
      model: "action/getByApplicationId",
      input: { application_id },
    });
    const result = await db.query(_getByApplicationId, [application_id]);

    return result.rows[0];
  } catch (e) {
    return (e as Error).message;
  }
};

const upsert: any = async (
  code: string,
  description: string,
  application_id: string
) => {
  try {
    createLogger.info({
      model: "action/upsert",
      input: { code, description, application_id },
    });
    const result = await db.query(_upsert, [code, description, application_id]);

    return result.rows;
  } catch (e) {
    return (e as Error).message;
  }
};

const deleteById: any = async (id: string) => {
  try {
    createLogger.info({
      model: "action/deleteById",
      input: { id },
    });
    const result = await db.query(_deleteById, [id]);

    return result.rows;
  } catch (e) {
    return (e as Error).message;
  }
};

export { getAll, getById, getByCode, getByApplicationId, upsert, deleteById };
