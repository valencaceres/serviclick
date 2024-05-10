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
    const result = await db.query(_getById, [id]);

    return result.rows[0];
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
    const result = await db.query(_getByRut, [rut]);

    return result.rows[0];
  } catch (e) {
    return (e as Error).message;
  }
};

const upsert: any = async (
  rut: string,
  name: string,
  paternalLastName: string,
  maternalLastName: string,
  address: string,
  phone: string,
  district_id: string,
  birthdate: string,
  email: string
) => {
  try {
    createLogger.info({
      model: "person/upsert",
    });
    const result = await db.query(_upsert, [
      rut,
      name,
      paternalLastName,
      maternalLastName,
      email,
      phone,
      address,
      district_id,
      birthdate,
    ]);

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
    const result = await db.query(_deleteById, [id]);

    return result.rows;
  } catch (e) {
    return (e as Error).message;
  }
};

export { getAll, getById, getByRut, upsert, deleteById };
