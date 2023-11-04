import bcrypt from "bcrypt";

import { generateGenericPassword } from "../util/user";
import createLogger from "../util/logger";
import { sendMail } from "../util/email";

import * as User from "../models/user";
import * as Person from "../models/person";
import { fetchClerkUser } from "../util/clerkUserData";
import { IPerson } from "../interfaces/person";

const create = async (req: any, res: any) => {
  const {
    rut,
    name,
    paternalLastName,
    maternalLastName,
    address,
    district,
    email,
    phone,
    birthDate,
  }: IPerson = req.body;
  const personResponse = await Person.create(
    rut,
    name,
    paternalLastName,
    maternalLastName,
    address,
    district,
    email,
    phone,
    birthDate
  );

  if (!personResponse.success) {
    createLogger.error({
      model: "person/create",
      error: personResponse.error,
    });
    res.status(500).json({ error: "Error creating person" });
    return;
  }

  const { id: person_id } = personResponse.data;
  const userResponse = await User.create(person_id, email);

  if (!userResponse.success) {
    createLogger.error({
      model: "user/create",
      error: userResponse.error,
    });
    res.status(500).json({ error: "Error creating user" });
    return;
  }

  createLogger.info({
    controller: "user/create",
    message: "OK",
  });
  res.status(200).json(userResponse.data);
};

const deleteUserById = async (req: any, res: any) => {
  const { id } = req.params;
  const userResponse = await User.deleteUserById(id);

  if (!userResponse.success) {
    createLogger.error({
      model: "person/deleteUserById",
      error: userResponse.error,
    });
    res.status(500).json({ error: "Error deleting user" });
    return;
  }

  createLogger.info({
    controller: "user/deleteUserById",
    message: "OK",
  });
  res.status(200).json(userResponse.data);
};

const assignPassword = async (req: any, res: any) => {
  const { id, password } = req.body;

  const result = await User.assignPassword(id, password);
  if (!result.success) {
    createLogger.error({
      model: "user/assignPassword",
      error: result.error,
    });
    res.status(500).json({ error: "Error assigning password to user" });
    return;
  }

  createLogger.info({
    controller: "user/assignPassword",
    message: "OK",
  });
  res.status(200).json(result);
};

const validate = async (req: any, res: any) => {
  try {
    const { login, password } = req.body;
    const result = await User.getByEmail(login);

    if (!result.success) {
      createLogger.error({
        model: "user/validate",
        error: result.error,
      });
      res.status(500).json({ error: "Error retrieving user" });
      return;
    }

    if (!result.data.hash) {
      createLogger.error({
        model: "user/validate",
        error: "User not valid",
      });
      res.status(403).json({ error: "User not valid" });
      return;
    }

    const isValid = await bcrypt.compare(password, result.data.hash);
    if (!isValid) {
      createLogger.error({
        model: "user/validate",
        error: "User not valid",
      });
      res.status(403).json({ error: "User not valid" });
      return;
    }

    createLogger.info({
      controller: "user/validate",
      message: "OK",
    });
    res.status(200).json(result.data);
  } catch (e) {
    createLogger.error({
      controller: "user/validate",
      error: (e as Error).message,
    });
    res.status(500).json({ error: "Error validating user" });
    return;
  }
};

const getByRut = async (req: any, res: any) => {
  try {
    const { rut } = req.params;
    const result = await User.getByRut(rut);

    if (!result.success) {
      createLogger.error({
        model: "user/getByRut",
        error: result.error,
      });
      res.status(500).json({ error: "Error retrieving user" });
      return;
    }

    createLogger.info({
      controller: "user/getByRut",
      message: "OK",
    });
    res.status(200).json(result.data);
  } catch (e) {
    createLogger.error({
      controller: "user/getByEmail",
      error: (e as Error).message,
    });
    res.status(500).json({ error: "Error retrieving user" });
    return;
  }
};

const getByEmail = async (req: any, res: any) => {
  try {
    const { email } = req.params;
    const result = await User.getByEmail(email);

    if (!result.success) {
      createLogger.error({
        model: "user/getByEmail",
        error: result.error,
      });
      res.status(500).json({ error: "Error retrieving user" });
      return;
    }

    createLogger.info({
      controller: "user/getByEmail",
      message: "OK",
    });
    res.status(200).json(result.data);
  } catch (e) {
    createLogger.error({
      controller: "user/getByEmail",
      error: (e as Error).message,
    });
    res.status(500).json({ error: "Error retrieving user" });
    return;
  }
};

const getAll = async (req: any, res: any) => {
  try {
    const result = await User.getAll();

    if (!result.success) {
      createLogger.error({
        model: "user/getAll",
        error: result.error,
      });
      res.status(500).json({ error: "Error retrieving users" });
      return;
    }

    createLogger.info({
      controller: "user/getAll",
      message: "OK",
    });
    res.status(200).json(result.data);
  } catch (e) {
    createLogger.error({
      controller: "user/getAll",
      error: (e as Error).message,
    });
    res.status(500).json({ error: "Error retrieving users" });
    return;
  }
};

const sendCredentials = async (req: any, res: any) => {
  try {
    const { email } = req.body;
    const userResponse = await User.getByEmail(email);

    if (!userResponse.success) {
      createLogger.error({
        model: "user/getByEmail",
        error: userResponse.error,
      });
      res.status(500).json({ error: "Error retrieving user" });
      return;
    }

    const { id, name } = userResponse.data;

    const generatedPassword = generateGenericPassword();

    const userPasswordResponse = await User.assignPassword(
      id,
      generatedPassword
    );

    if (!userPasswordResponse.success) {
      createLogger.error({
        model: "user/assignPassword",
        error: userPasswordResponse.error,
      });
      res.status(500).json({ error: "Error assigning password to user" });
      return;
    }

    await sendMail(
      { name: "Bienvenido a ServiClick" },
      email,
      `Tus credenciales de acceso a nuestra plataforma`,
      `<b>Hola&nbsp;${name}</b><br/><br/>Bienvenido a ServiClick, a continuación te detallamos los datos de acceso a nuestra plataforma para que puedas realizar tus labores:<br/><br/><b>https://app.serviclick.cl</b><br/><br/><b>Login:</b>&nbsp;${email}<br/><b>Password</b>:&nbsp;${generatedPassword}<br/><br/><b>Saludos cordiales,</b><br/><br/><b>Equipo ServiClick</b>`,
      []
    );

    createLogger.info({
      model: "user/sendCredentials",
      data: "OK",
      error: null,
    });
    res.status(200).json("e-mail send");
    return;
  } catch (e) {
    createLogger.error({
      controller: "user/assignPassword",
      error: (e as Error).message,
    });
    res.status(500).json({ error: "Error sending credentials" });
    return;
  }
};

const updatePassword = async (req: any, res: any) => {
  const { email, password, newPassword } = req.body;

  const result = await User.getByEmail(email);

  if (!result.success) {
    createLogger.error({
      model: "user/getByEmail",
      error: result.error,
    });
    res.status(500).json({ error: "Error retrieving user" });
    return;
  }

  if (!result.data.hash) {
    createLogger.error({
      model: "user/validate",
      error: "User not valid",
    });
    res.status(403).json({ error: "User not valid" });
    return;
  }

  const isValid = await bcrypt.compare(password, result.data.hash);
  if (!isValid) {
    createLogger.error({
      model: "user/validate",
      error: "User not valid",
    });
    res.status(403).json({ error: "User not valid" });
    return;
  }

  const { id } = result.data;

  const responseUpdatePassword = await User.assignPassword(id, newPassword);

  if (!responseUpdatePassword.success) {
    createLogger.error({
      model: "user/assignPassword",
      error: responseUpdatePassword.error,
    });
    res.status(500).json({ error: "Error assigning password" });
    return;
  }

  createLogger.info({
    controller: "user/updatePassword",
    message: "OK",
  });

  res.status(200).json("OK");
};

const getByClerkId = async (req: any, res: any) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids)) {
      console.log(ids);
      return res
        .status(400)
        .json({ success: false, data: null, error: "Invalid input" });
    }
    const results = await Promise.all(ids.map((id: any) => fetchClerkUser(id)));
    const validResults = results.filter((result) => result);

    if (validResults.length > 0) {
      return res.status(200).json({ success: true, data: validResults });
    } else {
      return res
        .status(500)
        .json({ success: false, data: null, error: "Error retrieving users" });
    }
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, data: null, error: "Error retrieving users" });
  }
};

export {
  create,
  deleteUserById,
  assignPassword,
  validate,
  getByRut,
  getByEmail,
  getAll,
  sendCredentials,
  updatePassword,
  getByClerkId,
};
