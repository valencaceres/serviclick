import db from "../utils/database";
import createLogger from "../utils/logger";

import {
  _getAll,
  _getById,
  _getByRut,
  _getByEmail,
  _upsert,
  _deleteById,
  _updatePassword,
  _getUserRolAgent
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
    console.log(result.rows)
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

const getByEmail: any = async (email: string, password: string) => {
  try {
    createLogger.info({
      model: "user/getByEmail",
      input: { email, password },
    });
    const result = await db.query(_getByEmail, [email]);
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
  email: string,
  phone: string,
  address: string,
  birthdate: string,
  district_id: string
) => {
  try {
    createLogger.info({
      model: "user/upsert",
      input: {
        rut,
        name,
        paternalLastName,
        maternalLastName,
        email,
        phone,
        address,
        birthdate,
        district_id,
      },
    });
    const result = await db.query(_upsert, [
      rut,
      name,
      paternalLastName,
      maternalLastName,
      email,
      phone,
      address,
      birthdate,
      district_id,
    ]);

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
    const result = await db.query(_updatePassword, [password, id]);
    return result.rows;
  } catch (e) {
    return (e as Error).message;
  }
};

const getUserRolAgent: any = async (id: string) => {
  try {
    createLogger.info({
      model: "user/updatePassword",
      input: { id },
    });
    const result = await db.query(_getUserRolAgent, [id]);
    return result.rows;
  } catch (e: any) {
    return (e as Error).message;
  }
}
  
export {
  getAll,
  getById,
  getByRut,
  getByEmail,
  upsert,
  deleteById,
  updatePassword,
  getUserRolAgent
};
