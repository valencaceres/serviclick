import db from "../utils/database";
import createLogger from "../utils/logger";

import {
  _getAll,
  _getById,
  _getByRut,
  _upsert,
  _deleteById,
  _updatePassword,
  _validate,
} from "../queries/user";

const getAll: any = async () => {
  try {
    createLogger.info({
      model: "user/getAll",
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
      model: "user/getById",
      input: { id },
    });
    const result = await db.query(_getById, [id]);

    return result.rows[0];
  } catch (e) {
    return (e as Error).message;
  }
};

const getByRut: any = async (rut: string) => {
  try {
    createLogger.info({
      model: "user/getByRut",
      input: { rut },
    });
    const result = await db.query(_getByRut, [rut]);

    return result.rows[0];
  } catch (e) {
    return (e as Error).message;
  }
};

const upsert: any = async () => {
  try {
    createLogger.info({
      model: "user/upsert",
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
      model: "user/deleteById",
      input: { id },
    });
    const result = await db.query(_deleteById, [id]);

    return result.rows;
  } catch (e) {
    return (e as Error).message;
  }
};

const updatePassword: any = async (id: string, password: string) => {
  try {
    createLogger.info({
      model: "user/updatePassword",
      input: { id, password },
    });
    const result = await db.query(_updatePassword);

    return result.rows;
  } catch (e) {
    return (e as Error).message;
  }
};

const validate: any = async (email: string, password: string) => {
  try {
    createLogger.info({
      model: "user/validate",
      input: { email, password },
    });
    const result = await db.query(_validate);

    return result.rows;
  } catch (e) {
    return (e as Error).message;
  }
};

export {
  getAll,
  getById,
  getByRut,
  upsert,
  deleteById,
  updatePassword,
  validate,
};
