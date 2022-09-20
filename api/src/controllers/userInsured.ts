import bcrypt from "bcrypt";

import createLogger from "../util/logger";

import * as UserInsured from "../models/userInsured";

const assignPassword = async (req: any, res: any) => {
  const { id, password } = req.body;

  const result = await UserInsured.assignPassword(id, password);
  if (!result.success) {
    createLogger.error({
      model: "userInsured/assignPassword",
      error: result.error,
    });
    res.status(500).json({ error: result.error });
    return;
  }

  createLogger.info({
    controller: "userInsured",
    message: "OK",
  });
  res.status(200).json(result);
};

const validate = async (req: any, res: any) => {
  try {
    const { login, password } = req.body;
    const result = await UserInsured.getByEmail(login);

    if (!result.success) {
      createLogger.error({
        model: "userInsured/getByEmail",
        error: result.error,
      });
      res.status(500).json({ error: result.error });
      return;
    }

    const isValid = await bcrypt.compare(password, result.data.hash);
    if (!isValid) {
      createLogger.error({
        model: "userInsured",
        error: "User not valid",
      });
      res.status(403).json({ error: "User not valid" });
      return;
    }

    createLogger.info({
      controller: "userInsured",
      message: "OK",
    });
    res.status(200).json(result.data);
  } catch (e) {
    createLogger.error({
      controller: "userInsured/validate",
      error: (e as Error).message,
    });
    res.status(500).json({ error: (e as Error).message });
    return;
  }
};

const getByEmail = async (req: any, res: any) => {
  try {
    const { email } = req.params;
    const result = await UserInsured.getByEmail(email);

    if (!result.success) {
      createLogger.error({
        model: "userInsured/getByEmail",
        error: result.error,
      });
      res.status(500).json({ error: result.error });
      return;
    }

    createLogger.info({
      controller: "userInsured",
      message: "OK",
    });
    res.status(200).json(result.data);
  } catch (e) {
    createLogger.error({
      controller: "userInsured/getByEmail",
      error: (e as Error).message,
    });
    res.status(500).json({ error: (e as Error).message });
    return;
  }
};

export { assignPassword, validate, getByEmail };
