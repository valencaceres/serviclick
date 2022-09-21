import axios from "axios";

import createLogger from "../util/logger";
import * as SubscriptionModel from "../models/subscription";
import * as UserInsuredModel from "../models/userInsured";
import * as UserCompanyModel from "../models/userCompany";
import * as LeadModel from "../models/lead";
import * as CompanyModel from "../models/company";

import { generateGenericPassword } from "../util/user";
import config from "../util/config";

const feedbackController = async (req: any, res: any) => {
  const { data } = req.body;
  switch (data.event) {
    case "subscription_activated":
      await subscriptionActivated(req.body.data);
      break;
    case "subscription_renewal_cancelled":
      break;
    case "subscription_payment_succeeded":
      await subscriptionPaymentSucceeded(req.body.data);
      break;
    case "subscription_payment_in_recovery":
      break;
  }
  res.status(200).json("OK");
};

const subscriptionActivated = async (data: any) => {
  const subscription_id = data.data.subscription_id;
  const event = data.event;

  const subscriptionResponse = await SubscriptionModel.createModel(
    subscription_id,
    event,
    ""
  );

  if (!subscriptionResponse.success) {
    createLogger.error({
      model: "subscription/createModel",
      error: subscriptionResponse.error,
    });
    return;
  }

  const leadResponse = await LeadModel.getBySubscriptionId(subscription_id);
  if (!leadResponse.success) {
    createLogger.error({
      model: "lead/getBySubscriptionId",
      error: leadResponse.error,
    });
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
      return;
    }

    const emailResponse: any = await axios.post(
      config.email.URL.send,
      {
        to: companyResponse.data.email,
        subject: "Bienvenido a ServiClick",
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
      return;
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
      return;
    }

    const emailResponse: any = await axios.post(
      config.email.URL.send,
      {
        to: insured.email,
        subject: "Bienvenido a ServiClick",
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
      return;
    }
  });

  if (responses.length > 0) {
    return responses;
  }

  createLogger.info({
    controller: "webhook",
    message: "OK",
  });
  return "OK";
};

const subscriptionPaymentSucceeded = async (data: any) => {
  const { subscription_id, buy_order } = data.data;
  const event = data.event;

  const subscriptionResponse = await SubscriptionModel.createModel(
    subscription_id,
    event,
    buy_order
  );

  if (!subscriptionResponse.success) {
    createLogger.error({
      model: "subscription/createModel",
      error: subscriptionResponse.error,
    });
    return;
  }

  createLogger.info({
    controller: "webhook",
    message: "OK",
  });
  return "OK";
};

export { feedbackController };
