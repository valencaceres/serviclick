import bcrypt from "bcrypt";
import axios from "axios";

import createLogger from "../util/logger";
import { generateGenericPassword } from "../util/user";
import config from "../util/config";

import * as UserInsured from "../models/userInsured";

const assignPassword = async (req: any, res: any) => {
  const { id, password } = req.body;

  const result = await UserInsured.assignPassword(id, password);
  if (!result.success) {
    createLogger.error({
      model: "userInsured/assignPassword",
      error: result.error,
    });
    res.status(500).json({ error: "Error assigning password to user insured" });
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
      res.status(500).json({ error: "Error retrieving user insured" });
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
    res.status(500).json({ error: "Error validating user insured " });
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
      res.status(500).json({ error: "Error retrieving user insured" });
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
    res.status(500).json({ error: "Error retrieving user insured" });
    return;
  }
};

const restorePassword = async (req: any, res: any) => {
  try {
    const {email} = req.body
    const emailResponse = await UserInsured.getByEmailWithId(email)

    if (!emailResponse.success) {
      createLogger.error({
        model: "userInsured/restorePassword",
        error: emailResponse.error,
      });
      res.status(500).json({ error: "Error getting user insured" });
      return;
    }
    const generatedPassword = generateGenericPassword();
    const userPasswordResponse = await UserInsured.assignPassword(
      emailResponse.data.user_id,
      generatedPassword  
    )

    if (!userPasswordResponse.success) {
      createLogger.error({
        model: "userInsured/assignPassword",
        error: userPasswordResponse.error,
      });
    }
    const sendEmailResponse: any = await axios.post(
      config.email.URL.send,
      {
        from: { name: "Restauracion de contraseña" },
        to: 'dev.vcaceres@gmail.com',
        subject: "Tus credenciales de acceso a nuestra plataforma",
        message: `<b>Hola&nbsp;${emailResponse.data.name}</b><br/><br/>A continuación te detallamos los datos de acceso a nuestra plataforma para que puedas completar o modificar la información que requieras:<br/><br/><b>https://asegurado.serviclick.cl</b><br/><br/><b>Login:</b>&nbsp;${email}<br/><b>Password</b>:&nbsp;${generatedPassword}<br/><br/><b>Saludos cordiales,</b><br/><br/><b>Equipo ServiClick</b>`,
      },
      {
        headers: config.email.apiKey,
      }
    );
    if (!sendEmailResponse.data.success) {
      createLogger.error({
        model: "email",
        error: sendEmailResponse.error,
      });
      return { success: false, error: "Error creating email" };
    }
    return res.status(200).json({success: true, data: 'OK', error: null})
  } catch (e: any) {
    createLogger.error({
      controller: "userInsured/restorePassword",
      error: (e as Error).message,
    });
    res.status(500).json({ error: "Error restoring user insured" });
    return;
  }
}

export { assignPassword, validate, getByEmail, restorePassword };
