import bcrypt from "bcrypt";

import createLogger from "../util/logger";

import * as UserBroker from "../models/userBroker";
import * as Broker from "./broker";

const create = async (req: any, res: any) => {
  const {
    broker_id,
    rut,
    name,
    paternalLastName,
    maternalLastName,
    email,
    profileCode,
  } = req.body;

  const result = await UserBroker.create(
    broker_id,
    rut,
    name,
    paternalLastName,
    maternalLastName,
    email,
    profileCode
  );

  if (!result.success) {
    createLogger.error({
      model: "userBroker/create",
      error: result.error,
    });
    res.status(500).json({ error: result.error });
    return;
  }

  createLogger.info({
    controller: "userBroker/create",
    message: "OK",
  });
  res.status(200).json(result);
};

const assignPassword = async (req: any, res: any) => {
  const { id, password } = req.body;

  const result = await UserBroker.assignPassword(id, password);
  if (!result.success) {
    createLogger.error({
      model: "userBroker/assignPassword",
      error: result.error,
    });
    res.status(500).json({ error: result.error });
    return;
  }

  createLogger.info({
    controller: "userBroker/assignPassword",
    message: "OK",
  });
  res.status(200).json(result);
};

const validate = async (req: any, res: any) => {
  try {
    const { broker_rut, login, password } = req.body;
    const result = await UserBroker.getByEmail(broker_rut, login);

    if (!result.success) {
      createLogger.error({
        model: "userBroker/validate",
        error: result.error,
      });
      res.status(500).json({ error: result.error });
      return;
    }

    if (!result.data.user.hash) {
      createLogger.error({
        model: "userBroker/validate",
        error: "User not valid",
      });
      res.status(403).json({ error: "User not valid" });
      return;
    }

    const isValid = await bcrypt.compare(password, result.data.user.hash);
    if (!isValid) {
      createLogger.error({
        model: "userBroker/validate",
        error: "User not valid",
      });
      res.status(403).json({ error: "User not valid" });
      return;
    }

    createLogger.info({
      controller: "userBroker/validate",
      message: "OK",
    });
    res.status(200).json(result.data);
  } catch (e) {
    createLogger.error({
      controller: "userBroker/validate",
      error: (e as Error).message,
    });
    res.status(500).json({ error: (e as Error).message });
    return;
  }
};

const getByEmail = async (req: any, res: any) => {
  try {
    const { email } = req.params;
    const result = await UserBroker.getByEmail(email);

    if (!result.success) {
      createLogger.error({
        model: "userBroker/getByEmail",
        error: result.error,
      });
      res.status(500).json({ error: result.error });
      return;
    }

    createLogger.info({
      controller: "userBroker",
      message: "OK",
    });
    res.status(200).json(result.data);
  } catch (e) {
    createLogger.error({
      controller: "userBroker/getByEmail",
      error: (e as Error).message,
    });
    res.status(500).json({ error: (e as Error).message });
    return;
  }
};

const sendCredentials = async (req: any, res: any) => {
  const { broker_rut, email } = req.body;

  const responseSendCredentials = await Broker.sendCredentials(
    broker_rut,
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
  const { broker_rut, email, password, newPassword } = req.body;

  const result = await UserBroker.getByEmail(broker_rut, email);

  if (!result.success) {
    createLogger.error({
      model: "userBroker/validate",
      error: result.error,
    });
    res.status(500).json({ error: result.error });
    return;
  }

  if (!result.data.hash) {
    createLogger.error({
      model: "userBroker/validate",
      error: "User not valid",
    });
    res.status(403).json({ error: "User not valid" });
    return;
  }

  const isValid = await bcrypt.compare(password, result.data.hash);
  if (!isValid) {
    createLogger.error({
      model: "userBroker/validate",
      error: "User not valid",
    });
    res.status(403).json({ error: "User not valid" });
    return;
  }

  const { id } = result.data;

  const responseUpdatePassword = await UserBroker.assignPassword(
    id,
    newPassword
  );

  if (!responseUpdatePassword.success) {
    createLogger.error({
      model: "userBroker/assignPassword",
      error: responseUpdatePassword.error,
    });
    res.status(500).json({ error: responseUpdatePassword.error });
    return;
  }

  createLogger.info({
    controller: "userBroker/updatePassword",
    message: "OK",
  });

  res.status(200).json("OK");
};

export {
  create,
  assignPassword,
  validate,
  getByEmail,
  sendCredentials,
  updatePassword,
};
