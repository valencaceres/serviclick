import db from "../utils/database";
import createLogger from "../utils/logger";

import {
  _getAll,
  _getById,
  _getByRut,
  _upsert,
  _deleteById,
} from "../queries/person";

const getAll: any = async () => {
  try {
    createLogger.info({
      model: "person/getAll",
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
      model: "person/getById",
      input: { id },
    });
    const result = await db.query(_getById);

    return result.rows[0]
  } catch (e) {
    return (e as Error).message;
  }
};

const getByRut: any = async (rut: string) => {
  try {
    createLogger.info({
      model: "person/getByRut",
      input: { rut },
    });
    const result = await db.query(_getByRut);

    return result.rows[0]
  } catch (e) {
    return (e as Error).message;
  }
};

const upsert: any = async () => {
  try {
    createLogger.info({
      model: "person/upsert",
    });
    const result = await db.query(_upsert);

    return result.rows;
  } catch (e) {
    return (e as Error).message;
  }
};

const deleteById: any = async (id: string) => {
  try {
    createLogger.info({
      model: "person/deleteById",
      input: { id },
    });
    const result = await db.query(_deleteById);

    return result.rows;
  } catch (e) {
    return (e as Error).message;
  }
};

export { getAll, getById, getByRut, upsert, deleteById };
