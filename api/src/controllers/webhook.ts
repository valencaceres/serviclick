import axios from "axios";

import createLogger from "../util/logger";
import * as UserInsuredModel from "../models/userInsured";
import * as UserCompanyModel from "../models/userCompany";
import * as LeadModel from "../models/lead";
import * as CompanyModel from "../models/company";

import { generateGenericPassword } from "../util/user";
import config from "../util/config";

const subscriptionActivated = async (req: any, res: any) => {
  const { subscription_id } = req.body;

  try {
    const leadResponse = await LeadModel.getBySubscriptionId(subscription_id);
    if (!leadResponse.success) {
      createLogger.error({
        model: "lead/getBySubscriptionId",
        error: leadResponse.error,
      });
      res.status(500).json(leadResponse.error);
      return;
    }

    const leadInsuredResponse = await LeadModel.getInsuredById(
      leadResponse.data.id
    );

    if (!leadInsuredResponse.success) {
      createLogger.error({
        model: "leadInsured/getInsuredById",
        error: leadInsuredResponse.error,
      });
      res.status(500).json(leadInsuredResponse.error);
      return;
    }

    const { company_id } = leadResponse.data;
    if (company_id) {
      const companyResponse = await CompanyModel.getByIdModel(company_id);
      if (!companyResponse.success) {
        createLogger.error({
          model: "company/getByIdModel",
          error: companyResponse.error,
        });
        res.status(500).json(companyResponse.error);
        return;
      }

      const userCompanyResponse = await UserCompanyModel.create(
        company_id,
        companyResponse.data.email
      );
      if (!userCompanyResponse.success) {
        createLogger.error({
          model: "userCompany/create",
          error: userCompanyResponse.error,
        });
        res.status(500).json(userCompanyResponse.error);
        return;
      }

      const generatedPassword = generateGenericPassword();
      const userCopmpanyResponse = await UserCompanyModel.assignPassword(
        userCompanyResponse.data.id,
        generatedPassword
      );

      if (!userCopmpanyResponse.success) {
        createLogger.error({
          model: "userCompany/assignPassword",
          error: userCopmpanyResponse.error,
        });
        res.status(500).json(userCopmpanyResponse.error);
        return;
      }

      const emailResponse: any = await axios.post(
        config.email.URL.send,
        {
          from: "Bienvenido a ServiClick",
          to: companyResponse.data.email,
          subject: "Tus credenciales de acceso a nuestra plataforma",
          message: `<b>Hola&nbsp;${companyResponse.data.companyName}</b><br/><br/>Bienvenido a ServiClick, a continuación te detallamos los datos de acceso a nuestra plataforma para que puedas completar o modificar la información que requieras:<br/><br/><b>https://empresa.serviclick.cl</b><br/><br/><b>Login:</b>&nbsp;${companyResponse.data.email}<br/><b>Password</b>:&nbsp;${generatedPassword}<br/><br/><b>Saludos cordiales,</b><br/><br/><b>Equipo ServiClick</b>`,
        },
        {
          headers: config.email.apiKey,
        }
      );

      if (!emailResponse.data.success) {
        createLogger.error({
          model: "email",
          error: emailResponse.error,
        });
        res.status(500).json(emailResponse.error);
        return;
      }
    }

    type DetailT = {
      insured_id: string;
      error: string;
    };

    const responses: DetailT[] = [];

    leadInsuredResponse.data.map(async (insured: any) => {
      const userInsuredResponse = await UserInsuredModel.create(
        insured.id,
        insured.email
      );

      if (!userInsuredResponse.success) {
        createLogger.error({
          model: "userInsured/create",
          error: userInsuredResponse.error,
        });
        responses.push({
          insured_id: insured.id,
          error: "User error: " + userInsuredResponse.error,
        });
      }

      const generatedPassword = generateGenericPassword();
      const userPasswordResponse = await UserInsuredModel.assignPassword(
        userInsuredResponse.data.id,
        generatedPassword
      );

      if (!userPasswordResponse.success) {
        createLogger.error({
          model: "userInsured/assignPassword",
          error: userPasswordResponse.error,
        });
        responses.push({
          insured_id: insured.id,
          error: "Password error: " + userPasswordResponse.error,
        });
      }

      const emailResponse: any = await axios.post(
        config.email.URL.send,
        {
          from: "Bienvenido a ServiClick",
          to: insured.email,
          subject: "Tus credenciales de acceso a nuestra plataforma",
          message: `<b>Hola&nbsp;${insured.name}</b><br/><br/>Bienvenido a ServiClick, a continuación te detallamos los datos de acceso a nuestra plataforma para que puedas completar o modificar la información que requieras:<br/><br/><b>https://asegurado.serviclick.cl</b><br/><br/><b>Login:</b>&nbsp;${insured.email}<br/><b>Password</b>:&nbsp;${generatedPassword}<br/><br/><b>Saludos cordiales,</b><br/><br/><b>Equipo ServiClick</b>`,
        },
        {
          headers: config.email.apiKey,
        }
      );

      if (!emailResponse.data.success) {
        createLogger.error({
          model: "email",
          error: emailResponse.error,
        });
        res.status(500).json(emailResponse.error);
        return;
      }
    });

    if (responses.length > 0) {
      return responses;
    }

    createLogger.info({
      controller: "webhook/subscriptionActivated",
      message: "OK",
    });
    res.status(200).json("OK");
  } catch (e) {
    createLogger.error({
      controller: "webhook/subscriptionActivated",
      error: (e as Error).message,
    });
    res.status(500).json((e as Error).message);
    return;
  }
};

export { subscriptionActivated };
