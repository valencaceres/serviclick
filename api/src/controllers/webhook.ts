import axios from "axios";

import * as UserInsuredModel from "../models/userInsured";
import * as UserCompanyModel from "../models/userCompany";
import * as LeadModel from "../models/lead";
import * as CompanyModel from "../models/company";
import * as ProductDescriptionModel from "../models/productDescription";
import * as InsuredModel from "../models/insured";

import createLogger from "../util/logger";
import { generateGenericPassword } from "../util/user";
import { monthNames } from "../util/date";
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

    const { id: lead_id, company_id } = leadResponse.data;

    const leadProductResponse = await LeadModel.getProductsById(
      lead_id //leadResponse.data.id
    );

    if (!leadProductResponse.success) {
      createLogger.error({
        model: "lead/getProductsById",
        error: leadProductResponse.error,
      });
      res.status(500).json(leadProductResponse.error);
      return;
    }

    const { product_id, price, currency_code, frequency_code } =
      leadProductResponse.data;

    const productDescriptionResponse =
      await ProductDescriptionModel.getByProductId(
        lead_id,
        product_id //leadResponse.data.id
      );

    if (!productDescriptionResponse.success) {
      createLogger.error({
        model: "productDescription/getByProductId",
        error: productDescriptionResponse.error,
      });
      res.status(500).json(productDescriptionResponse.error);
      return;
    }

    const leadInsuredResponse = await LeadModel.getInsuredById(
      lead_id //leadResponse.data.id
    );

    if (!leadInsuredResponse.success) {
      createLogger.error({
        model: "lead/getInsuredById",
        error: leadInsuredResponse.error,
      });
      res.status(500).json(leadInsuredResponse.error);
      return;
    }

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

      const responseDocuments = await generateDocuments(
        lead_id,
        null,
        companyResponse.data,
        productDescriptionResponse.data,
        price * leadInsuredResponse.data.length
      );

      if (!responseDocuments.success) {
        createLogger.error({
          model: responseDocuments.model,
          error: responseDocuments.error,
        });
        res.status(500).json(responseDocuments.error);
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

      const attachmentCompany = [
        `contrato_${lead_id}.pdf`,
        `anexo_${lead_id}.pdf`,
      ];

      createLogger.info({
        url: config.email.URL.send,
        method: "POST",
        body: {
          from: { name: "Bienvenido a ServiClick" },
          to: companyResponse.data.email,
          subject: "Tus credenciales de acceso a nuestra plataforma",
          message: `<b>Hola&nbsp;${companyResponse.data.companyName}</b><br/><br/>Bienvenido a ServiClick, a continuación te detallamos los datos de acceso a nuestra plataforma para que puedas completar o modificar la información que requieras:<br/><br/><b>https://empresa.serviclick.cl</b><br/><br/><b>Login:</b>&nbsp;${companyResponse.data.email}<br/><b>Password</b>:&nbsp;${generatedPassword}<br/><br/><b>Saludos cordiales,</b><br/><br/><b>Equipo ServiClick</b>`,
          attachments: attachmentCompany,
        },
        params: "",
        query: "",
      });

      const emailResponse: any = await axios.post(
        config.email.URL.send,
        {
          from: { name: "Bienvenido a ServiClick" },
          to: companyResponse.data.email,
          subject: "Tus credenciales de acceso a nuestra plataforma",
          message: `<b>Hola&nbsp;${companyResponse.data.companyName}</b><br/><br/>Bienvenido a ServiClick, a continuación te detallamos los datos de acceso a nuestra plataforma para que puedas completar o modificar la información que requieras:<br/><br/><b>https://empresa.serviclick.cl</b><br/><br/><b>Login:</b>&nbsp;${companyResponse.data.email}<br/><b>Password</b>:&nbsp;${generatedPassword}<br/><br/><b>Saludos cordiales,</b><br/><br/><b>Equipo ServiClick</b>`,
          attachments: attachmentCompany,
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

    const attachmentInsured = [`anexo_${lead_id}.pdf`];

    if (!company_id) {
      const insuredResponse = await InsuredModel.getByIdModel(
        leadInsuredResponse.data[0].id
      );

      if (!insuredResponse.success) {
        createLogger.error({
          model: "insured/getByIdModel",
          error: insuredResponse.error,
        });
        res.status(500).json(insuredResponse.error);
        return;
      }

      const responseDocuments = await generateDocuments(
        lead_id,
        insuredResponse.data,
        null,
        productDescriptionResponse.data,
        price
      );

      if (!responseDocuments.success) {
        createLogger.error({
          model: responseDocuments.model,
          error: responseDocuments.error,
        });
        res.status(500).json(responseDocuments.error);
        return;
      }

      attachmentInsured.push(`contrato_${lead_id}.pdf`);
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

      createLogger.info({
        url: config.email.URL.send,
        method: "POST",
        body: {
          from: { name: "Bienvenido a ServiClick" },
          to: insured.email,
          subject: "Tus credenciales de acceso a nuestra plataforma",
          message: `<b>Hola&nbsp;${insured.name}</b><br/><br/>Bienvenido a ServiClick, a continuación te detallamos los datos de acceso a nuestra plataforma para que puedas completar o modificar la información que requieras:<br/><br/><b>https://asegurado.serviclick.cl</b><br/><br/><b>Login:</b>&nbsp;${insured.email}<br/><b>Password</b>:&nbsp;${generatedPassword}<br/><br/><b>Saludos cordiales,</b><br/><br/><b>Equipo ServiClick</b>`,
          attachments: attachmentInsured,
        },
        params: "",
        query: "",
      });

      const emailResponse: any = await axios.post(
        config.email.URL.send,
        {
          from: { name: "Bienvenido a ServiClick" },
          to: insured.email,
          subject: "Tus credenciales de acceso a nuestra plataforma",
          message: `<b>Hola&nbsp;${insured.name}</b><br/><br/>Bienvenido a ServiClick, a continuación te detallamos los datos de acceso a nuestra plataforma para que puedas completar o modificar la información que requieras:<br/><br/><b>https://asegurado.serviclick.cl</b><br/><br/><b>Login:</b>&nbsp;${insured.email}<br/><b>Password</b>:&nbsp;${generatedPassword}<br/><br/><b>Saludos cordiales,</b><br/><br/><b>Equipo ServiClick</b>`,
          attachments: attachmentInsured,
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

const generateDocuments = async (
  lead_id: string,
  customer: any,
  company: any,
  productDescription: any,
  price: number
) => {
  try {
    const correlative = `${new Date().getFullYear()}-${
      lead_id.split("-")[lead_id.split("-").length - 1]
    }`;

    createLogger.info({
      url: config.pdf.URL.contract,
      method: "POST",
      body: {
        lead_id,
        correlative,
        contact: {
          phone: "600 0860 580",
          email: "info@serviclick.cl",
        },
        customer,
        company,
        plan: {
          name: productDescription.name,
          coverages: productDescription.assistances
            .map((assistance: any) => assistance.name)
            .join(", "),
          price,
        },
      },
      params: "",
      query: "",
    });

    const contractResponse: any = await axios.post(
      config.pdf.URL.contract,
      {
        lead_id,
        correlative,
        contact: {
          phone: "600 0860 580",
          email: "info@serviclick.cl",
        },
        customer,
        company,
        plan: {
          name: productDescription.name,
          coverages: productDescription.assistances
            .map((assistance: any) => assistance.name)
            .join(", "),
          price,
        },
      },
      {
        headers: config.pdf.apiKey,
      }
    );

    // if (contractResponse.status !== 200) {
    //   return {
    //     success: false,
    //     model: "api-pdf/document/annex",
    //     error: contractResponse.error,
    //   };
    // }

    createLogger.info({
      url: config.pdf.URL.annex,
      method: "POST",
      body: { ...productDescription, lead_id },
      params: "",
      query: "",
    });

    const annexResponse: any = await axios.post(
      config.pdf.URL.annex,
      { ...productDescription, lead_id },
      {
        headers: config.pdf.apiKey,
      }
    );

    // if (annexResponse.status !== 200) {
    //   return {
    //     success: false,
    //     model: "api-pdf/document/annex",
    //     error: contractResponse.error,
    //   };
    // }

    return {
      success: true,
      model: "api-pdf",
      error: null,
    };
  } catch (e) {
    return {
      success: false,
      model: "api-pdf",
      error: (e as Error).message,
    };
  }
};

export { subscriptionActivated };
