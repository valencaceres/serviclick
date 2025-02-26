import axios from "axios";
import xlsx from "xlsx";

import config from "../util/config";
import createLogger from "../util/logger";
import { sendMail } from "../util/email";

import * as Lead from "../models/lead";
import * as Subscription from "../models/subscription";
import * as LeadProduct from "../models/leadProduct";
import * as LeadInsured from "../models/leadInsured";
import * as LeadBeneficiary from "../models/leadBeneficiary";
import * as LeadProductValue from "../models/leadProductValue";
import * as FileFormat from "../models/fileFormat";

import * as Customer from "../models/customer";
import * as Company from "../models/company";
import * as Insured from "../models/insured";
import * as Beneficiary from "../models/beneficiary";
import * as Product from "../models/product";
import * as ProductPlan from "../models/productPlan";
import * as Policy from "../models/policy";
import * as LeadProductValues from "../models/leadProductValue";
import { getContractLink } from "../util/s3";
import { formatRut } from "../util/rut";
import { fillEmptyEmail } from "../util/email";
import * as Payment from '../models/payment'

import excelToJson from "../util/excelToJson";
import { Retail } from "../models";

export type CustomerT = {
  id: string;
  rut: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  birthDate: string;
  address: string;
  district: string;
  email: string;
  phone: string;
};

export type CompanyT = {
  id: string;
  rut: string;
  companyName: string;
  legalRepresentative: string;
  line: string;
  address: string;
  district: string;
  email: string;
  phone: string;
};

type BeneficiaryT = {
  id: string;
  rut: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  birthDate: string;
  address: string;
  district: string;
  email: string;
  phone: string;
  relationship?: string;
};

type ValuesT = {
  value_id: string;
  valuetype_code: string;
  family_id: string;
  family_name: string;
  value_name: string;
  value: string;
};

type InsuredT = {
  id: string;
  rut: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  birthDate: string;
  address: string;
  district: string;
  email: string;
  phone: string;
  values?: ValuesT[];
  beneficiaries?: BeneficiaryT[];
};

type ProductT = {
  product_id: string;
  price: number;
  currency_code: string;
  frequency_code: string;
  productPlan_id: number;
  beneficiary_price: number;
};

type LeadT = {
  id: string;
  customer: CustomerT;
  company: CompanyT;
  product: ProductT;
  insured: InsuredT[];
  subscription: any;
};

const initialLeadData: LeadT = {
  id: "",
  customer: {
    id: "",
    rut: "",
    name: "",
    paternalLastName: "",
    maternalLastName: "",
    birthDate: "",
    address: "",
    district: "",
    email: "",
    phone: "",
  },
  company: {
    id: "",
    rut: "",
    companyName: "",
    legalRepresentative: "",
    line: "",
    address: "",
    district: "",
    email: "",
    phone: "",
  },
  product: {
    product_id: "",
    price: 0,
    currency_code: "",
    frequency_code: "",
    productPlan_id: 0,
    beneficiary_price: 0,
  },
  insured: [],
  subscription: {},
};

function isRecord(obj: unknown): obj is Record<string, any> {
  return typeof obj === "object" && obj !== null;
}

const errorHandler = (response: any, path: string) => {
  if (!response.success) {
    createLogger.error({
      model: path,
      error: response.error,
    });
    //return { success: false, data: null, error: response.error };
    throw new Error(
      JSON.stringify({
        model: path,
        error: response.error,
      })
    );
  }

  return { success: true, data: response.data, error: null };
};

export const createCustomer = async (customer: CustomerT) => {
  const customerResponse = await Customer.createModel(
    customer.rut,
    customer.name,
    customer.paternalLastName,
    customer.maternalLastName,
    customer.address,
    customer.district,
    customer.email,
    customer.phone
  );
  return errorHandler(customerResponse, "lead/createCustomerModel");
};

export const createCompany = async (company: CompanyT) => {
  const companyResponse = await Company.create(
    company.rut,
    company.companyName,
    company.legalRepresentative,
    company.line,
    company.address,
    company.district,
    company.email,
    company.phone
  );
  return errorHandler(companyResponse, "lead/createCompanyModel");
};

export const createProduct = async (id: string, product: any) => {
  const leadProductResponse = await LeadProduct.createModel(
    id,
    product.id,
    product.price,
    product.currency_code,
    product.frequency_code,
    product.productPlan_id
  );
  return errorHandler(leadProductResponse, "lead/createLeadProductModel");
};

export const createLead = async (
  id: string,
  agent_id: string,
  customer_id: string,
  company_id: string,
  link: string = "",
  user_id?: string
) => {
  const leadResponse = await Lead.createModel(
    id,
    customer_id,
    company_id,
    agent_id,
    link,
    undefined,
    undefined,
    undefined,
    user_id
  );

  const RetailResponse = await Retail.getById(agent_id);
  if (
    RetailResponse.success &&
    RetailResponse?.data?.id &&
    RetailResponse?.data?.id === agent_id
  ) {
    const RetailCodeUpsert = await Retail.upsertCode(
      leadResponse?.data?.id,
      agent_id
    );
  }
  return errorHandler(leadResponse, "lead/createLeadModel");
};

export const deleteLeadInsured = async (id: string) => {
  const deleteInsuredResponse = await LeadInsured.deleteByLeadId(id);
  return errorHandler(deleteInsuredResponse, "lead/deleteInsuredByLeadId");
};

export const createInsured = async (insured: InsuredT) => {
  const insuredResponse = await Insured.create(
    insured.rut,
    insured.name,
    insured.paternalLastName,
    insured.maternalLastName,
    insured.birthDate,
    insured.address,
    insured.district,
    insured.email,
    insured.phone
  );
  return errorHandler(insuredResponse, "lead/createInsuredModel");
};

export const createLeadInsured = async (id: string, insured_id: string) => {
  const leadInsuredResponse = await LeadInsured.createModel(id, insured_id);
  return errorHandler(leadInsuredResponse, "lead/createLeadInsuredtModel");
};

export const deleteLeadBeneficiaries = async (id: string, insured_id: string) => {
  const deleteBeneficiariesResponse = await LeadBeneficiary.deleteByLeadId(
    id,
    insured_id
  );
  return errorHandler(
    deleteBeneficiariesResponse,
    "lead/deleteBeneficiariesByLeadId"
  );
};

export const createBeneficiary = async (beneficiary: BeneficiaryT) => {
  const beneficiaryResponse = await Beneficiary.createModel(
    beneficiary.rut,
    beneficiary.name,
    beneficiary.paternalLastName,
    beneficiary.maternalLastName,
    beneficiary.birthDate,
    beneficiary.address,
    beneficiary.district,
    beneficiary.email,
    beneficiary.phone,
    beneficiary.relationship || ""
  );
  return errorHandler(beneficiaryResponse, "lead/createBeneficiaryModel");
};

export const createLeadBeneficiary = async (
  id: string,
  insured_id: string,
  beneficiary_id: string
) => {
  const leadbeneficiaryResponse = await LeadBeneficiary.createModel(
    id,
    insured_id,
    beneficiary_id
  );
  return errorHandler(leadbeneficiaryResponse, "lead/createBeneficiaryModel");
};

export const sendPaymentLink = async (lead: LeadT, link: string = "") => {
  const {
    success,
    data: product,
    error,
  } = await Product.getProduct(lead.product.product_id);

  if (!success) {
    createLogger.error({
      model: "model/getProduct",
      error,
    });
    return { success, data: null, error };
  }

  const href =
    link === ""
      ? `https://web.serviclick.cl/payment/${
          lead.customer.rut ? "customer" : "company"
        }/${lead.product.product_id}?leadId=${lead.id}`
      : link;

  const emailResponse = await sendMail(
    { name: "Bienvenido a ServiClick" },
    lead.customer.email || lead.company.email,
    `Link de pago para ${product.name}`,
    `<b>Hola&nbsp;${
      lead.company.rut ? lead.company.companyName : lead.customer.name
    }</b><br/><br/>Queremos que seas parte de ServiClick y solo estás a un paso, te dejamos el link de pago para que puedas completar la adquisición de ${
      product.name
    } y disfrutes de los beneficios que te brinda:<br/><br/><a href="${href}">Concluye tu proceso de pago haciendo click aquí</a><br/><br/>Por que sabemos de asistencias, nos enfocamos en resolver todas las necesidades que te ayuden a vivir más tranquilo y seguro.<br/><br/><b>Saludos cordiales,</b><br/><br/><b>Equipo ServiClick</b>`,
    []
  );

  return emailResponse.data;
};

export const updateLeadPaymentType = async (
  lead_id: string,
  paymentTypeCode: string
) => {
  const responseUpdate = await Lead.updatePaymentTypeCode(
    lead_id,
    paymentTypeCode
  );
  return errorHandler(responseUpdate, "lead/updatePaymentTypeCode");
};

const createSubscription = async (
  lead_id: string,
  customer: CustomerT,
  company: CompanyT,
  product: ProductT,
  insured: InsuredT[]
) => {
  try {
    const contractor = customer.rut !== "" ? customer : company;

    const name =
      customer.rut !== ""
        ? customer.name +
          " " +
          customer.paternalLastName +
          " " +
          customer.maternalLastName
        : company.companyName;
    const address = contractor.address + ", " + contractor.district;

    const subscriptionData = {
      email: contractor.email,
      name,
      amount:
        product.price * insured.length +
        (insured.length > 0 &&
        insured[0].beneficiaries &&
        insured[0].beneficiaries.length > 0 &&
        product.beneficiary_price > 0
          ? insured[0].beneficiaries.length * product.beneficiary_price
          : 0),
      address,
      rut: contractor.rut,
      phone: contractor.phone,
    };

    createLogger.info({
      url: config.reveniu.URL.subscription,
      method: "POST",
      body: {
        plan_id: product.productPlan_id,
        field_values: subscriptionData,
      },
      params: "",
      query: "",
    });

    const subscriptionReveniuResponse = await axios.post(
      config.reveniu.URL.subscription,
      {
        plan_id: product.productPlan_id,
        field_values: subscriptionData,
      },
      {
        headers: config.reveniu.apiKey,
      }
    );

    const {
      id: subscription_id,
      completion_url,
      security_token,
      status_code,
    } = subscriptionReveniuResponse.data;

    createLogger.info({
      url: config.webHook.URL.reveniu,
      method: "POST",
      body: {
        data: {
          data: {
            subscription_id,
            lead_id,
          },
        },
      },
      params: "",
      query: "",
    });

    const leadResponse = await Lead.updateSubscription(
      lead_id,
      subscription_id
    );

    if (!leadResponse.success) {
      createLogger.error({
        model: "lead/updateSubscription",
        error: leadResponse.error,
      });
      return {
        success: false,
        data: null,
        error: leadResponse.error,
      };
    }

    const subscriptionReveniu = await axios.get(
      `${config.reveniu.URL.subscription}${subscription_id}`,
      {
        headers: config.reveniu.apiKey,
      }
    );

    const {
      status: status_id,
      interval: interval_id,
      plan_id,
      plan_amount,
      last_payment,
    } = subscriptionReveniu.data;
    const { date: last_payment_date, status } = last_payment;

    const subscriptionResponse = await Subscription.createModel(
      status_id,
      interval_id,
      subscription_id,
      plan_amount,
      plan_id,
      last_payment_date,
      status
    );

    if (!subscriptionResponse.success) {
      createLogger.error({
        model: "subscription/createModel",
        error: subscriptionResponse.error,
      });
      return {
        success: false,
        error: subscriptionResponse.error,
      };
    }

    return {
      success: true,
      data: {
        id: subscription_id,
        completion_url,
        security_token,
        status_code,
      },
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const addInsuredFromExcelItem = async (
  lead_id: string,
  product_id: string,
  data: any
) => {
  const insuredResponse = await createInsured({
    ...data,
    rut: formatRut(data.rut),
    email:
      data.email === "" || !data.email ? fillEmptyEmail(data.rut) : data.email,
  });

  if (!insuredResponse.success) {
    createLogger.error({
      model: "lead/createInsured",
      error: insuredResponse.error,
    });
    return {
      success: false,
      data: null,
      error: insuredResponse.error,
    };
  }

  const { id: insured_id } = insuredResponse.data;

  const leadInsuredResponse = await createLeadInsured(lead_id, insured_id);

  if (!leadInsuredResponse.success) {
    createLogger.error({
      model: "lead/createLeadInsured",
      error: leadInsuredResponse.error,
    });
    return {
      success: false,
      data: null,
      error: leadInsuredResponse.error,
    };
  }

  for (const value of data.values) {
    const leadProductValuesResponse = await LeadProductValues.create(
      lead_id,
      product_id,
      insured_id,
      value.id,
      value.value
    );
  }
};

const addMultipleInsured = async (
  leadDataResponse: any,
  insured: InsuredT[],
  productId: string
) => {
  try {
    const insuredPromises = insured.flatMap(async (item: any) => {
      const insuredDataPromises = item.data.map(async (insuredItem: any) => {
        const { data: insuredData } = await createInsured(insuredItem);

        const { data: leadInsuredData } = await createLeadInsured(
          leadDataResponse.id,
          insuredData.id
        );

        const leadProductDeleteResponse =
          await LeadProductValues.deleteByInsuredId(
            leadDataResponse.id,
            productId,
            insuredData.id
          );

        if (insuredItem.values && insuredItem.values.length > 0) {
          for (const value of insuredItem.values) {
            const leadProductValue = await LeadProductValues.create(
              leadDataResponse.id,
              productId,
              insuredData.id,
              value.value_id,
              value.value
            );
          }
        }

        const { data: leadBeneficiaryDelete } = await deleteLeadBeneficiaries(
          leadDataResponse.id,
          insuredData.id
        );

        const newInsured = { ...insuredData, beneficiaries: [] };

        if (insuredItem.beneficiaries && insuredItem.beneficiaries.length > 0) {
          for (const beneficiary of insuredItem.beneficiaries) {
            const { data: beneficiaryData } = await createBeneficiary(
              beneficiary
            );

            const { data: leadBeneficiaryData } = await createLeadBeneficiary(
              leadDataResponse.id,
              insuredData.id,
              beneficiaryData.id
            );

            newInsured.beneficiaries.push(beneficiaryData);
          }
        }

        return newInsured;
      });

      return Promise.all(insuredDataPromises);
    });

    const insuredDataArray = await Promise.all(insuredPromises);

    leadDataResponse = {
      ...leadDataResponse,
      insured: insuredDataArray,
    };

    return { success: true, data: leadDataResponse };
  } catch (error) {
    console.error("Error al procesar:", error);
    return { success: false, data: null, error: error };
  }
};

export const create = async (lead: any) => {
  try {
    const {
      id,
      customer,
      company,
      product,
      insured,
      agent_id,
      link = "",
      user_id,
    } = lead;
    let leadDataResponse: any = initialLeadData;

    if (customer.rut !== "") {
      const { data: customerData } = await createCustomer(customer);
      leadDataResponse = { ...leadDataResponse, customer: customerData };
    }

    if (company && company.rut !== "") {
      const { data: conpanyData } = await createCompany(company);
      leadDataResponse = { ...leadDataResponse, company: conpanyData };
    }

    const { data: leadData } = await createLead(
      id,
      agent_id,
      leadDataResponse.customer.id,
      leadDataResponse.company.id,
      link,
      user_id
    );
    leadDataResponse = { ...leadDataResponse, id: leadData.id };

    const { data: leadProductData } = await createProduct(
      leadDataResponse.id,
      lead.product
    );
    leadDataResponse = { ...leadDataResponse, product: leadProductData };

    if (lead.insured) {
      await deleteLeadInsured(leadDataResponse.id);

      for (const item of insured) {
        const { data: insuredData } = await createInsured(item);

        const { data: leadInsuredData } = await createLeadInsured(
          leadDataResponse.id,
          insuredData.id
        );

        const leadProductDeleteResponse =
          await LeadProductValues.deleteByInsuredId(
            leadDataResponse.id,
            product.id,
            insuredData.id
          );

        if (item.values) {
          for (const value of item.values) {
            const leadProductValue = await LeadProductValues.create(
              leadDataResponse.id,
              product.id,
              insuredData.id,
              value.value_id,
              value.value
            );
          }
        }

        const { data: leadBeneficiaryDelete } = await deleteLeadBeneficiaries(
          leadDataResponse.id,
          insuredData.id
        );

        const newInsured = { ...insuredData, beneficiaries: [] };
        for (const beneficiary of item.beneficiaries) {
          const { data: beneficiaryData } = await createBeneficiary(
            beneficiary
          );

          const { data: leadBeneficiaryData } = await createLeadBeneficiary(
            leadDataResponse.id,
            insuredData.id,
            beneficiaryData.id
          );

          newInsured.beneficiaries.push(beneficiaryData);
        }

        leadDataResponse = {
          ...leadDataResponse,
          insured: [...leadDataResponse.insured, newInsured],
        };
      }
    }

    return { success: true, data: leadDataResponse, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export const upsert = async (lead: any) => {
  const {
    productPlanId,
    rut,
    name,
    paternalLastName,
    maternalLastName,
    address,
    district,
    email,
    phone,
    birthDate,
    initialDate,
    endDate,
  } = lead;

  let { success, data, error } = await Lead.upsert(
    productPlanId,
    rut,
    name,
    paternalLastName,
    maternalLastName,
    address,
    district,
    email,
    phone,
    birthDate,
    initialDate,
    endDate
  );

  return { success, data, error };
};

const createController = async (req: any, res: any) => {
  const {
    id,
    customer,
    company,
    product,
    insured,
    agent_id,
    link,
    send,
    subscription,
    user_id,
  } = req.body;

  if (insured.length > 0 && !customer.birthDate) {
    customer.birthDate = insured[0].birthDate;
  }
  let { success, data, error } = await create({
    id,
    customer,
    company,
    product,
    insured,
    agent_id,
    link,
    user_id,
  });

  if (!success || !data) {
    createLogger.error({
      function: "lead/create",
      error,
    });
    res.status(500).json({ error: "error creating lead" });
    return;
  }

  if (send) {
    const emailResponse = await sendPaymentLink(data, link);
    if (!emailResponse.success) {
      createLogger.error({
        function: "lead/sendPaymentLink",
        error: emailResponse.error,
      });
      res.status(500).json({ error: "error sending payment link" });
      return;
    }

    const responseLeadUpdate = await updateLeadPaymentType(data.id, "L");
    if (!responseLeadUpdate.success) {
      createLogger.error({
        function: "lead/updateLeadPaymentType",
        error: responseLeadUpdate.error,
      });
      res.status(500).json({ error: "error updating lead payment type " });
      return;
    }
  }

  if (subscription) {
    const subscriptionResponse = await createSubscription(
      data.id,
      data.customer,
      data.company,
      product,
      data.insured
    );

    if (!subscriptionResponse.success) {
      createLogger.error({
        function: "lead/createSubscription",
        error: subscriptionResponse.error,
      });
      res.status(500).json({ error: "error creating subscription (1)" });
      return;
    }

    data = { ...data, subscription: subscriptionResponse.data };
  }

  createLogger.info({
    controller: "lead/createController",
    message: "OK",
  });
  res.status(200).json(data);
};

const getByIdController = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const leadResponse = await Lead.getById(id);

    if (!leadResponse.success) {
      createLogger.error({
        model: "lead/getById",
        error: leadResponse.error,
      });
      res.status(500).json({ error: "Error retrieving lead" });
      return;
    }

    getData(leadResponse, res);
  } catch (error) {
    createLogger.error({
      controller: "lead/getById",
      error: (error as Error).message,
    });
    res.status(500).json({ error: "Error retrieving lead" });
    return;
  }
};

const getBySubscriptionIdController = async (req: any, res: any) => {
  const { subscription_id } = req.params;
  try {
    const leadResponse = await Lead.getBySubscriptionId(subscription_id);

    if (!leadResponse.success) {
      createLogger.error({
        model: "lead/getBySubscriptionId",
        error: leadResponse.error,
      });
      res.status(500).json({ error: "Error retrieving lead" });
      return;
    }

    getData(leadResponse, res);
  } catch (error) {
    createLogger.error({
      controller: "lead/getBySubscriptionIdController",
      error: (error as Error).message,
    });
    res.status(500).json({ error: "Error retrieving lead" });
    return;
  }
};

const getData = async (leadResponse: any, res: any) => {
  try {
    const {
      id,
      agent_id,
      createdate,
      customer_id,
      customer_rut,
      customer_name,
      customer_paternallastname,
      customer_maternallastname,
      customer_birthdate,
      customer_address,
      customer_district,
      customer_email,
      customer_phone,
      company_id,
      company_rut,
      company_companyname,
      company_legalrepresentative,
      company_line,
      company_address,
      company_district,
      company_email,
      company_phone,
      subscription_id,
      completion_url,
      security_token,
      status_code,
      link,
    } = leadResponse.data;

    const lead_id = id;

    const leadProductResponse = await LeadProduct.getByLeadId(id);

    if (!leadProductResponse.success) {
      createLogger.error({
        model: "lead/getProductByLeadId",
        error: leadProductResponse.error,
      });
      res.status(500).json({
        error: "Error retrieving lead product",
      });
      return;
    }

    const leadInsuredResponse = await LeadInsured.getByLeadId(id);

    if (!leadInsuredResponse.success) {
      createLogger.error({
        model: "lead/getInsuredLeadId",
        error: leadInsuredResponse.error,
      });
      res.status(500).json({
        error: "Error retrieving lead insured",
      });
      return;
    }

    const leadBeneficiariesResponse = await LeadBeneficiary.getByLeadId(id);

    if (!leadBeneficiariesResponse.success) {
      createLogger.error({
        model: "lead/getBNeneficiariesByLeadId",
        error: leadBeneficiariesResponse.error,
      });
      res.status(500).json({
        error: "Error retrieving lead beneficiary",
      });
      return;
    }

    const insuredData: InsuredT[] = [];

    //leadInsuredResponse.data.map(async (item: any) => {
    for (const item of leadInsuredResponse.data) {
      const responseValues = await LeadProductValues.getByInsuredId(
        lead_id,
        leadProductResponse.data.product_id,
        item.id
      );

      if (!responseValues.success) {
        createLogger.error({
          model: "leadProductValues/getByInsuredId",
          error: responseValues.error,
        });
        res.status(500).json({
          error: "Error retrieving lead product values",
        });
        return;
      }

      const beneficiaryData: BeneficiaryT[] = [];

      leadBeneficiariesResponse.data
        .filter((beneficiary: any) => beneficiary.insured_id === item.id)
        .map(async (beneficiary: any) => {
          const {
            id,
            rut,
            name,
            paternallastname,
            maternallastname,
            birthdate,
            address,
            district,
            email,
            phone,
            relationship,
          } = beneficiary;

          beneficiaryData.push({
            id,
            rut,
            name,
            paternalLastName: paternallastname,
            maternalLastName: maternallastname,
            birthDate: birthdate,
            address,
            district,
            email,
            phone,
            relationship,
          });
        });

      const {
        id,
        rut,
        name,
        paternallastname,
        maternallastname,
        birthdate,
        address,
        district,
        email,
        phone,
      } = item;

      insuredData.push({
        id,
        rut,
        name,
        paternalLastName: paternallastname,
        maternalLastName: maternallastname,
        birthDate: birthdate,
        address,
        district,
        email,
        phone,
        beneficiaries: beneficiaryData,
        values: responseValues.data,
      });
    }

    const leadResponseData = {
      id,
      agent_id,
      date: createdate,
      customer: {
        id: customer_id,
        rut: customer_rut,
        name: customer_name,
        paternalLastName: customer_paternallastname,
        maternalLastName: customer_maternallastname,
        birthDate: customer_birthdate,
        address: customer_address,
        district: customer_district,
        email: customer_email,
        phone: customer_phone,
      },
      company: {
        id: company_id,
        rut: company_rut,
        companyName: company_companyname,
        legalRepresentative: company_legalrepresentative,
        line: company_line,
        address: company_address,
        district: company_district,
        email: company_email,
        phone: company_phone,
      },
      product: {
        id: leadProductResponse.data.product_id,
        price: leadProductResponse.data.price,
        currency_code: leadProductResponse.data.currency_code,
        frequency_code: leadProductResponse.data.frequency_code,
        productPlan_id: leadProductResponse.data.productplan_id,
        beneficiary_price: leadProductResponse.data.beneficiary_price,
      },
      insured: insuredData,
      subscription: {
        id: subscription_id,
        completion_url,
        security_token,
        status_code,
      },
      link,
      isActive: true,
    };

    createLogger.info({
      controller: "lead/getData",
      message: "OK",
    });
    res.status(200).json(leadResponseData);
  } catch (error) {
    createLogger.error({
      controller: "lead/getData",
      error: (error as Error).message,
    });
    res.status(500).json({ error: "Eror retrieving lead data" });
    return;
  }
};

const getProductByInsuredIdController = async (req: any, res: any) => {
  const { insured_id } = req.params;
  try {
    const leadResponse = await LeadProduct.getProductByInsuredId(insured_id);

    if (!leadResponse.success) {
      createLogger.error({
        model: "lead/getProductByInsuredId",
        error: leadResponse.error,
      });
      res.status(500).json({ error: "Error retrieving lead product" });
      return;
    }

    createLogger.info({
      controller: "lead/getProductByInsuredidController",
      message: "OK",
    });
    res.status(200).json(leadResponse.data);
  } catch (error) {
    createLogger.error({
      controller: "lead/getProductByInsuredIdController",
      error: (error as Error).message,
    });
    res.status(500).json({ error: "Error retrieving lead product" });
    return;
  }
};

const addBeneficiariesController = async (req: any, res: any) => {
  const { lead_id, insured_id, beneficiaries } = req.body;
  const responseBeneficiaries = await addBeneficiariesData(
    beneficiaries,
    lead_id,
    insured_id
  );

  if (!responseBeneficiaries.success) {
    createLogger.error({
      model: "lead/addBeneficiariesData",
      error: responseBeneficiaries.error,
    });
    res.status(500).json({ error: "error adding beneficiaries data" });
    return;
  }

  createLogger.info({
    controller: "lead/addBeneficieriesController",
    message: "OK",
  });
  res.status(200).json(responseBeneficiaries.data);
};

const getProductValuesByInsuredId = async (req: any, res: any) => {
  const { lead_id, product_id, insured_id } = req.body;
  const responseProductValues = await LeadProductValues.getByInsuredId(
    lead_id,
    product_id,
    insured_id
  );

  if (!responseProductValues.success) {
    createLogger.error({
      model: "leadProductValues/getByInsuredId",
      error: responseProductValues.error,
    });
    res.status(500).json({ error: "error getting lead products values" });
    return;
  }

  createLogger.info({
    controller: "leadProductValues/getByInsuredId",
    message: "OK",
  });
  res.status(200).json(responseProductValues.data);
};

const addBeneficiariesData = async (
  beneficiaries: any,
  lead_id: string,
  insured_id: string
) => {
  const beneficiaryData: BeneficiaryT[] = [];

  const deleteBeneficiariesResponse = await LeadBeneficiary.deleteByLeadId(
    lead_id,
    insured_id
  );

  if (!deleteBeneficiariesResponse.success) {
    return {
      success: false,
      data: null,
      error:
        "deleteBeneficiariesByLeadId: " + deleteBeneficiariesResponse.error,
    };
  }

  beneficiaries.map(async (beneficiary: any) => {
    const beneficiaryResponse = await Beneficiary.createModel(
      beneficiary.rut,
      beneficiary.name,
      beneficiary.paternalLastName,
      beneficiary.maternalLastName,
      beneficiary.birthDate,
      beneficiary.address,
      beneficiary.district,
      beneficiary.email,
      beneficiary.phone
    );

    if (!beneficiaryResponse.success) {
      return {
        success: false,
        data: null,
        error: "createBeneficiaryModel: " + beneficiaryResponse.error,
      };
    }

    const { id: beneficiary_id } = beneficiaryResponse.data;

    const leadbeneficiaryResponse = await LeadBeneficiary.createModel(
      lead_id,
      insured_id,
      beneficiary_id
    );

    if (!leadbeneficiaryResponse.success) {
      return {
        success: false,
        data: null,
        error: "createLeadBeneficiaryModel: " + leadbeneficiaryResponse.error,
      };
    }

    beneficiaryData.push({
      id: beneficiaryResponse.data.id,
      rut: beneficiaryResponse.data.rut,
      name: beneficiaryResponse.data.name,
      paternalLastName: beneficiaryResponse.data.paternallastname,
      maternalLastName: beneficiaryResponse.data.maternallastname,
      birthDate: beneficiaryResponse.data.birthdate,
      address: beneficiaryResponse.data.address,
      district: beneficiaryResponse.data.district,
      email: beneficiaryResponse.data.email,
      phone: beneficiaryResponse.data.phone,
    });
  });

  return {
    success: true,
    data: beneficiaryData,
    error: null,
  };
};

const addProduct = async (req: any, res: any) => {
  try {
    const {
      product_id,
      productPlan_id,
      agent_id,
      company_id,
      customer_id,
      link,
      paymenttype_code,
      customDate,
    } = req.body;

    const {
      success: policySuccess,
      data: policyData,
      error: policyError,
    } = await Policy.create(customDate);

    if (!policySuccess) {
      createLogger.error({
        model: "policy/create",
        error: policyError,
      });
      return res.status(500).json({ error: "error creating policy" });
    }

    const { id: policy_id } = policyData;

    const { data: productPlanData } = await ProductPlan.getById(productPlan_id);
    const { data: productData } = await Product.getById(product_id);

    const {
      success: subscriptionSuccess,
      data: subscriptionData,
      error: subscriptionError,
    } = await Subscription.create(
      productPlanData.price,
      productPlanData.plan_id,
      customDate
    );

    if (!subscriptionSuccess) {
      createLogger.error({
        model: "subscription/create",
        error: subscriptionError,
      });
      return res.status(500).json({ error: "error creating subscription (2)" });
    }

    const {
      success: leadSuccess,
      data: leadData,
      error: leadError,
    } = await Lead.createModel(
      "",
      customer_id,
      company_id,
      agent_id,
      link,
      subscriptionData.subscription_id,
      policy_id,
      paymenttype_code
    );

    if (!leadSuccess) {
      createLogger.error({
        model: "lead/create",
        error: leadError,
      });
      return res.status(500).json({ error: "error creating lead" });
    }

    const { id: lead_id } = leadData;

    const {
      success: leadProductSuccess,
      data: leadProductData,
      error: leadProductError,
    } = await LeadProduct.createModel(
      lead_id,
      product_id,
      productPlanData.price,
      productData?.currency,
      productPlanData.frequency,
      productPlanData.plan_id
    );

    if (!leadProductSuccess) {
      createLogger.error({
        model: "leadProduct/createModel",
        error: leadProductError,
      });
      return res.status(500).json({ error: "error creating lead product" });
    }

    createLogger.info({
      controller: "lead/addProduct",
      message: "OK",
    });

    res.status(200).json(leadProductData);
  } catch (err) {
    createLogger.error({
      model: "addProduct",
      error: err,
    });
    res.status(500).json({ error: "Error adding lead product" });
  }
};

const addInsured = async (req: any, res: any) => {
  const { subscription_id, beneficiary_data } = req.body;

  const insuredResponse = await Insured.create(
    beneficiary_data.rut,
    beneficiary_data.name,
    beneficiary_data.paternalLastName,
    beneficiary_data.maternalLastName,
    beneficiary_data.birthDate,
    beneficiary_data.address,
    beneficiary_data.district,
    beneficiary_data.email,
    beneficiary_data.phone
  );

  if (!insuredResponse.success) {
    createLogger.error({
      model: "insured/create",
      error: insuredResponse.error,
    });
    res.status(500).json({ error: "error creating insured" });
    return;
  }

  const { id: insured_id } = insuredResponse.data;

  const leadResponse = await Lead.getBySubscriptionId(subscription_id);

  if (!leadResponse.success) {
    createLogger.error({
      model: "lead/getBySubscriptionId",
      error: leadResponse.error,
    });

    res.status(500).json({ error: "error retrieving lead" });
    return;
  }

  const { id: lead_id } = leadResponse.data;

  const leadInsuredResponse = await LeadInsured.createModel(
    lead_id,
    insured_id
  );

  if (!leadInsuredResponse.success) {
    createLogger.error({
      model: "leadInsured/createModel",
      error: leadInsuredResponse.error,
    });
    res.status(500).json({ error: "error creating lead insured" });
    return;
  }

  createLogger.info({
    controller: "lead/addInsured",
    message: "Lead Insured created",
  });

  return res.status(200).json(leadInsuredResponse.data);
};

const addBeneficiary = async (req: any, res: any) => {
  const { insured_id, beneficiary_data, subscription_id } = req.body;

  const beneficiaryResponse = await Beneficiary.createModel(
    beneficiary_data.rut,
    beneficiary_data.name,
    beneficiary_data.paternalLastName,
    beneficiary_data.maternalLastName,
    beneficiary_data.birthDate,
    beneficiary_data.address,
    beneficiary_data.district,
    beneficiary_data.email,
    beneficiary_data.phone,
    beneficiary_data.relationship
  );

  if (!beneficiaryResponse.success) {
    createLogger.error({
      model: "beneficiary/createModel",
      error: beneficiaryResponse.error,
    });
    res.status(500).json({ error: "error creating beneficiary" });
    return;
  }

  const { id: beneficiary_id } = beneficiaryResponse.data;

  const leadResponse = await Lead.getBySubscriptionId(subscription_id);

  if (!leadResponse.success) {
    createLogger.error({
      model: "lead/getBySubscriptionId",
      error: leadResponse.error,
    });

    res.status(500).json({ erorr: "error retrieving lead" });
    return;
  }

  const { id: lead_id } = leadResponse.data;

  const leadBeneficiaryResponse = await LeadBeneficiary.createModel(
    lead_id,
    insured_id,
    beneficiary_id
  );

  if (!leadBeneficiaryResponse.success) {
    createLogger.error({
      model: "leadBeneficiary/createModel",
      error: leadBeneficiaryResponse.error,
    });
    res.status(500).json({ error: "error creating lead beneficiary" });
    return;
  }

  createLogger.info({
    controller: "lead/addBeneficiary",
    message: "Lead Beneficiary created",
  });

  return res.status(200).json(leadBeneficiaryResponse.data);
};

const removeBeneficiary = async (req: any, res: any) => {
  const { insured_id, beneficiary_id, subscription_id } = req.body;

  const leadResponse = await Lead.getBySubscriptionId(subscription_id);
  if (!leadResponse.success) {
    createLogger.error({
      model: "lead/getBySubscriptionId",
      error: leadResponse.error,
    });

    res.status(500).json({ error: "error retrieving lead" });
    return;
  }

  const { id: lead_id } = leadResponse.data;

  const leadBeneficiaryResponse = await LeadBeneficiary.removeBeneficiary(
    lead_id,
    insured_id,
    beneficiary_id
  );

  if (!leadBeneficiaryResponse.success) {
    createLogger.error({
      model: "leadBeneficiary/remove",
      error: leadBeneficiaryResponse.error,
    });
    res.status(500).json({ error: "error removing lead beneficiary" });
    return;
  }

  createLogger.info({
    controller: "lead/removeBeneficiary",
    message: "Lead Beneficiary deleted",
  });

  return res.status(200).json(leadBeneficiaryResponse.data.rows[0]);
};

const addFromCase = async (req: any, res: any) => {
  const { subscription_id, beneficiary_id, insured_id } = req.body;

  const leadResponse = await Lead.getBySubscriptionId(subscription_id);
  if (!leadResponse.success) {
    createLogger.error({
      model: "lead/getBySubscriptionId",
      error: leadResponse.error,
    });

    res.status(500).json({ error: "error retrieving lead" });
    return;
  }

  const { id: lead_id } = leadResponse.data;

  const leadInsuredResponse = await LeadInsured.createModel(
    lead_id,
    insured_id
  );

  if (!leadInsuredResponse.success) {
    createLogger.error({
      model: "leadInsured/createModel",
      error: leadInsuredResponse.error,
    });
    res.status(500).json({ error: "error creating lead insured" });
    return;
  }

  if (!beneficiary_id) {
    createLogger.info({
      controller: "lead/addFromCase",
      message: "Lead Insured and Beneficiary created",
    });

    return res.status(200).json({
      success: true,
    });
  }

  const leadBeneficiaryResponse = await LeadBeneficiary.createModel(
    lead_id,
    insured_id,
    beneficiary_id
  );

  if (!leadBeneficiaryResponse.success) {
    createLogger.error({
      model: "leadBeneficiary/createModel",
      error: leadBeneficiaryResponse.error,
    });
    res.status(500).json({ error: "error creating lead beneficiary" });
    return;
  }

  createLogger.info({
    controller: "lead/addFromCase",
    message: "Lead Insured and Beneficiary created",
  });

  return res.status(200).json({
    success: true,
  });
};

const addInsuredFromExcel = async (req: any, res: any) => {
  try {
    const { subscription_id } = req.body;
    const file = req.file;

    const workbook = xlsx.read(file.buffer, { type: "buffer" });
    const sheet_name_list = workbook.SheetNames;
    const xlsData = xlsx.utils.sheet_to_json(
      workbook.Sheets[sheet_name_list[0]],
      {
        raw: false,
        dateNF: "yyyy-mm-dd",
      }
    );

    const leadDataResponse = await Lead.getBySubscriptionId(subscription_id);

    if (!leadDataResponse.success) {
      createLogger.error({
        model: "lead/getBySubscriptionId",
        error: leadDataResponse.error,
      });
      res.status(500).json({ error: "error retrieving lead" });
      return;
    }

    const leadProductResponse = await LeadProduct.getByLeadId(
      leadDataResponse.data.id
    );

    if (!leadProductResponse.success) {
      createLogger.error({
        model: "leadProduct/getByLeadId",
        error: leadProductResponse.error,
      });
      res.status(500).json({ error: "error retrieving lead product" });
      return;
    }

    const fileFormatResponse = await FileFormat.getBySubscriptionId(
      subscription_id
    );

    if (!fileFormatResponse.success) {
      createLogger.error({
        model: "fileFormat/getBySubscriptionId",
        error: fileFormatResponse.error,
      });
      res.status(500).json({ error: "error retrieving file format" });
      return;
    }

    const { lead_id, product_id, fields } = fileFormatResponse.data;

    let data = [];

    for (const xlsItem of xlsData) {
      if (isRecord(xlsItem)) {
        let count = 0;
        let dataItem: any = {};

        for (const xlsField in xlsItem) {
          const { field_db_name, field_type, field_id } = fields[count];

          if (field_type === "value") {
            dataItem = {
              ...dataItem,
              values: dataItem.values
                ? [
                    ...dataItem.values,
                    { id: field_id, value: xlsItem[xlsField] },
                  ]
                : [{ id: field_id, value: xlsItem[xlsField] }],
            };
          } else {
            dataItem = {
              ...dataItem,
              [field_db_name]: xlsItem[xlsField],
            };
          }
          count++;
        }
        data.push(dataItem);
      }
    }

    // for (const item of data) {
    //   const contents = await addInsuredFromExcelItem(lead_id, product_id, item);
    // }

    await Promise.all(
      data.map(async (item) => {
        const contents = await addInsuredFromExcelItem(
          lead_id,
          product_id,
          item
        );
      })
    );

    // const jsonData = excelToJson(
    //   xlsData,
    //   subscription_id,
    //   leadProductResponse.data.product_id
    // );

    // const responses = await Promise.all(
    //   jsonData.map((item: any) =>
    //     addMultipleInsured(
    //       leadDataResponse.data,
    //       [item],
    //       leadProductResponse.data.product_id
    //     )
    //   )
    // );

    createLogger.info({
      controller: "lead/addInsuredFromExcel",
      data: `${data.length} beneficiarios enviados`,
    });

    const successResponse = { success: true, data: true };
    res.json(successResponse);
  } catch (error) {
    const errorResponse = { success: false, error };
    res.json(errorResponse);
  }
};

const getStatistics = async (req: any, res: any) => {
  const monthlySubscriptions = await Lead.getMonthlySubscriptions();

  if (!monthlySubscriptions.success) {
    createLogger.error({
      model: "lead/getMonthlySubscriptions",
      error: monthlySubscriptions.error,
    });
    res
      .status(500)
      .json({ error: "error retrieving lead monthly subscriptions" });
    return;
  }

  const totalCollected = await Lead.getTotalCollected();

  if (!totalCollected.success) {
    createLogger.error({
      model: "lead/getTotalCollected",
      error: totalCollected.error,
    });
    res.status(500).json({ error: "error retrieving lead total collected" });
    return;
  }

  const channelCollected = await Lead.getChannelCollected();

  if (!channelCollected.success) {
    createLogger.error({
      model: "lead/getChannelCollected",
      error: channelCollected.error,
    });
    res
      .status(500)
      .json({ error: "error retrieving lead channels collectedx" });
    return;
  }

  const statistics = {
    monthlySubscriptions: monthlySubscriptions.data,
    totalCollected: totalCollected.data,
    channelCollected: channelCollected.data,
  };

  createLogger.info({
    controller: "lead/getStatistics",
    message: "OK",
  });

  res.status(200).json(statistics);
};

const getContract = async (req: any, res: any) => {
  const { lead_id } = req.params;

  try {
    const link = await getContractLink(`contrato_${lead_id}.pdf`);

    createLogger.info({
      controller: `case/getContract`,
      message: `OK - Contract link generated`,
    });

    return res.status(200).json({ link });
  } catch (e: any) {
    if ((e.message = "File not found")) {
      return res.status(404).json({ error: "File not found" });
    }
    return res.status(500).json({ error: "Error retrieving contract" });
  }
};

const getService = async (req: any, res: any) => {
  try {
      const {id} = req.params
      const response = await Payment.getService(id)
      if (!response.success) {
        return {error: 'Error getting response'}
      }
      return res.status(200).json({success: true, data: response.data.channel_code, error: null})
  } catch (e) {
    return res.status(500).json({error: 'Error getting service'})
  }
}

export {
  createController,
  addBeneficiariesController,
  getByIdController,
  getBySubscriptionIdController,
  getProductByInsuredIdController,
  getProductValuesByInsuredId,
  addProduct,
  addInsured,
  addBeneficiary,
  getStatistics,
  getContract,
  addInsuredFromExcel,
  addFromCase,
  removeBeneficiary,
  getService
};
