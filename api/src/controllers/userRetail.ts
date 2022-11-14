import bcrypt from "bcrypt";

import createLogger from "../util/logger";

import * as UserRetail from "../models/userRetail";
import * as Retail from "./retail";

const assignPassword = async (req: any, res: any) => {
  const { id, password } = req.body;

  const result = await UserRetail.assignPassword(id, password);
  if (!result.success) {
    createLogger.error({
      model: "userRetail/assignPassword",
      error: result.error,
    });
    res.status(500).json({ error: result.error });
    return;
  }

  createLogger.info({
    controller: "userRetail",
    message: "OK",
  });
  res.status(200).json(result);
};

const validate = async (req: any, res: any) => {
  try {
    const { retail_rut, login, password } = req.body;
    const result = await UserRetail.getByEmail(retail_rut, login);

    if (!result.success) {
      createLogger.error({
        model: "userRetail/validate",
        error: result.error,
      });
      res.status(500).json({ error: result.error });
      return;
    }

    if (!result.data.user.hash) {
      createLogger.error({
        model: "userRetail/validate",
        error: "User not valid",
      });
      res.status(403).json({ error: "User not valid" });
      return;
    }

    const isValid = await bcrypt.compare(password, result.data.user.hash);
    if (!isValid) {
      createLogger.error({
        model: "userRetail/validate",
        error: "User not valid",
      });
      res.status(403).json({ error: "User not valid" });
      return;
    }

    createLogger.info({
      controller: "userRetail/validate",
      message: "OK",
    });
    res.status(200).json(result.data);
  } catch (e) {
    createLogger.error({
      controller: "userRetail/validate",
      error: (e as Error).message,
    });
    res.status(500).json({ error: (e as Error).message });
    return;
  }
};

const getByEmail = async (req: any, res: any) => {
  try {
    const { email } = req.params;
    const result = await UserRetail.getByEmail(email);

    if (!result.success) {
      createLogger.error({
        model: "userRetail/getByEmail",
        error: result.error,
      });
      res.status(500).json({ error: result.error });
      return;
    }

    createLogger.info({
      controller: "userRetail",
      message: "OK",
    });
    res.status(200).json(result.data);
  } catch (e) {
    createLogger.error({
      controller: "userRetail/getByEmail",
      error: (e as Error).message,
    });
    res.status(500).json({ error: (e as Error).message });
    return;
  }
};

const sendCredentials = async (req: any, res: any) => {
  const { retail_rut, email } = req.body;

  const responseSendCredentials = await Retail.sendCredentials(
    retail_rut,
    email,
    true
  );

  if (!responseSendCredentials.success) {
    createLogger.error({
      model: responseSendCredentials.model,
      error: responseSendCredentials.error,
    });
    res
      .status(responseSendCredentials.status)
      .json({ error: responseSendCredentials.error });
    return;
  }

  res.status(200).json("OK");
};

const updatePassword = async (req: any, res: any) => {
  const { retail_rut, email, password, newPassword } = req.body;

  const result = await UserRetail.getByEmail(retail_rut, email);

  if (!result.success) {
    createLogger.error({
      model: "userRetail/validate",
      error: result.error,
    });
    res.status(500).json({ error: result.error });
    return;
  }

  if (!result.data.hash) {
    createLogger.error({
      model: "userRetail/validate",
      error: "User not valid",
    });
    res.status(403).json({ error: "User not valid" });
    return;
  }

  const isValid = await bcrypt.compare(password, result.data.hash);
  if (!isValid) {
    createLogger.error({
      model: "userRetail/validate",
      error: "User not valid",
    });
    res.status(403).json({ error: "User not valid" });
    return;
  }

  const { id } = result.data;

  const responseUpdatePassword = await UserRetail.assignPassword(
    id,
    newPassword
  );

  if (!responseUpdatePassword.success) {
    createLogger.error({
      model: "userRetail/assignPassword",
      error: responseUpdatePassword.error,
    });
    res.status(500).json({ error: responseUpdatePassword.error });
    return;
  }

  createLogger.info({
    controller: "userRetail/updatePassword",
    message: "OK",
  });

  res.status(200).json("OK");
};

export {
  assignPassword,
  validate,
  getByEmail,
  sendCredentials,
  updatePassword,
};
