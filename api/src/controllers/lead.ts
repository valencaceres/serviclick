import axios from "axios";

import config from "../util/config";
import createLogger from "../util/logger";
import { sendMail } from "../util/email";

import * as Lead from "../models/lead";
import * as Subscription from "../models/subscription";
import * as LeadProduct from "../models/leadProduct";
import * as LeadInsured from "../models/leadInsured";
import * as LeadBeneficiary from "../models/leadBeneficiary";

import * as Customer from "../models/customer";
import * as Company from "../models/company";
import * as Insured from "../models/insured";
import * as Beneficiary from "../models/beneficiary";
import * as Product from "../models/product";
import * as ProductPlan from "../models/productPlan";
import * as Policy from "../models/policy";
import * as LeadProductValues from "../models/leadProductValue";

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
  beneficiaries: BeneficiaryT[];
  values: ValuesT[];
};

type ProductT = {
  product_id: string;
  price: number;
  currency_code: string;
  frequency_code: string;
  productPlan_id: number;
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
  },
  insured: [],
  subscription: {},
};

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

const createCustomer = async (customer: CustomerT) => {
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

const createCompany = async (company: CompanyT) => {
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

const createProduct = async (id: string, product: any) => {
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

const createLead = async (
  id: string,
  agent_id: string,
  customer_id: string,
  company_id: string,
  link: string = ""
) => {
  const leadResponse = await Lead.createModel(
    id,
    customer_id,
    company_id,
    agent_id,
    link
  );
  return errorHandler(leadResponse, "lead/createLeadModel");
};

const deleteLeadInsured = async (id: string) => {
  const deleteInsuredResponse = await LeadInsured.deleteByLeadId(id);
  return errorHandler(deleteInsuredResponse, "lead/deleteInsuredByLeadId");
};

const createInsured = async (insured: InsuredT) => {
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

const createLeadInsured = async (id: string, insured_id: string) => {
  const leadInsuredResponse = await LeadInsured.createModel(id, insured_id);
  return errorHandler(leadInsuredResponse, "lead/createLeadInsuredtModel");
};

const deleteLeadBeneficiaries = async (id: string, insured_id: string) => {
  const deleteBeneficiariesResponse = await LeadBeneficiary.deleteByLeadId(
    id,
    insured_id
  );
  return errorHandler(
    deleteBeneficiariesResponse,
    "lead/deleteBeneficiariesByLeadId"
  );
};

const createBeneficiary = async (beneficiary: BeneficiaryT) => {
  console.log({
    rut: beneficiary.rut,
    nombre: beneficiary.name,
    relationship: beneficiary.relationship || "",
  });
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
  console.log(beneficiaryResponse);
  return errorHandler(beneficiaryResponse, "lead/createBeneficiaryModel");
};

const createLeadBeneficiary = async (
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

const sendPaymentLink = async (lead: LeadT, link: string = "") => {
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

const updateLeadPaymentType = async (
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

    createLogger.info({
      url: config.reveniu.URL.subscription,
      method: "POST",
      body: {
        plan_id: product.productPlan_id,
        field_values: {
          email: contractor.email,
          name,
          amount: product.price * insured.length,
          address,
          rut: contractor.rut,
          phone: contractor.phone,
        },
      },
      params: "",
      query: "",
    });

    const subscriptionReveniuResponse = await axios.post(
      config.reveniu.URL.subscription,
      {
        plan_id: product.productPlan_id,
        field_values: {
          email: contractor.email,
          name,
          amount: product.price * insured.length,
          address,
          rut: contractor.rut,
          phone: contractor.phone,
        },
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

const create = async (lead: any) => {
  try {
    const {
      id,
      customer,
      company,
      product,
      insured,
      agent_id,
      link = "",
    } = lead;
    let leadDataResponse: LeadT = initialLeadData;

    if (customer.rut !== "") {
      const { data: customerData } = await createCustomer(customer);
      leadDataResponse = { ...leadDataResponse, customer: customerData };
    }
    console.log("OK1");

    if (company && company.rut !== "") {
      const { data: conpanyData } = await createCompany(company);
      leadDataResponse = { ...leadDataResponse, company: conpanyData };
    }
    console.log("OK2");

    const { data: leadData } = await createLead(
      id,
      agent_id,
      leadDataResponse.customer.id,
      leadDataResponse.company.id,
      link
    );
    leadDataResponse = { ...leadDataResponse, id: leadData.id };
    console.log("OK3");

    const { data: leadProductData } = await createProduct(
      leadDataResponse.id,
      product
    );
    leadDataResponse = { ...leadDataResponse, product: leadProductData };
    console.log("OK4");

    if (insured) {
      const { data: leadInsuredDelete } = await deleteLeadInsured(
        leadDataResponse.id
      );
      console.log("OK5");

      for (const item of insured) {
        const { data: insuredData } = await createInsured(item);
        console.log("OK6");

        const { data: leadInsuredData } = await createLeadInsured(
          leadDataResponse.id,
          insuredData.id
        );
        console.log("OK7");

        const leadProductDeleteResponse =
          await LeadProductValues.deleteByInsuredId(
            leadDataResponse.id,
            product.id,
            insuredData.id
          );
        console.log(leadProductDeleteResponse);

        if (item.values) {
          for (const value of item.values) {
            console.log("OK9---");
            const leadProductValue = await LeadProductValues.create(
              leadDataResponse.id,
              product.id,
              insuredData.id,
              value.value_id,
              value.value
            );
            console.log("OK9");
          }
        }

        const { data: leadBeneficiaryDelete } = await deleteLeadBeneficiaries(
          leadDataResponse.id,
          insuredData.id
        );
        console.log("OK10");

        const newInsured = { ...insuredData, beneficiaries: [] };
        for (const beneficiary of item.beneficiaries) {
          const { data: beneficiaryData } = await createBeneficiary(
            beneficiary
          );
          console.log("OK11");

          console.log(beneficiaryData);

          const { data: leadBeneficiaryData } = await createLeadBeneficiary(
            leadDataResponse.id,
            insuredData.id,
            beneficiaryData.id
          );
          console.log("OK12");

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
    console.log((e as Error).message);
    return { success: false, data: null, error: (e as Error).message };
  }
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
  } = req.body;

  let { success, data, error } = await create({
    id,
    customer,
    company,
    product,
    insured,
    agent_id,
    link,
  });

  if (!success || !data) {
    console.log("==HERE(1)==");
    res.status(500).json(error || "");
    return;
  }

  if (send) {
    const emailResponse = await sendPaymentLink(data, link);
    if (!emailResponse.success) {
      console.log("==HERE(2)==");
      res.status(500).json(emailResponse.error);
      return;
    }

    const responseLeadUpdate = await updateLeadPaymentType(data.id, "L");
    if (!responseLeadUpdate.success) {
      console.log("==HERE(3)==");
      res
        .status(500)
        .json({ error: "updateLeadPaymentType: " + responseLeadUpdate.error });
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
      console.log("==HERE(4)==");
      console.log(subscriptionResponse.error);
      res
        .status(500)
        .json({ error: "createSubscription: " + subscriptionResponse.error });
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
      res.status(500).json({ error: leadResponse.error });
      return;
    }

    getData(leadResponse, res);
  } catch (error) {
    createLogger.error({
      controller: "lead/getById",
      error: (error as Error).message,
    });
    res.status(500).json({ error });
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
      res.status(500).json({ error: leadResponse.error });
      return;
    }

    getData(leadResponse, res);
  } catch (error) {
    createLogger.error({
      controller: "lead/getBySubscriptionIdController",
      error: (error as Error).message,
    });
    res.status(500).json({ error });
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
        error: "leadProductModel: " + leadProductResponse.error,
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
        error: "leadInsuredModel: " + leadInsuredResponse.error,
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
        error: "leadBeneficiaryModel: " + leadBeneficiariesResponse.error,
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
          error: "leadProductValues: " + responseValues.error,
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
    res.status(500).json({ error });
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
      res.status(500).json({ error: leadResponse.error });
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
    res.status(500).json({ error });
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
    res.status(500).json(responseBeneficiaries.error);
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
    res.status(500).json(responseProductValues.error);
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
  const {
    product_id,
    productPlan_id,
    agent_id,
    company_id,
    customer_id,
    link,
    paymenttype_code,
  } = req.body;

  const policyResponse = await Policy.create();

  if (!policyResponse.success) {
    createLogger.error({
      model: "policy/create",
      error: policyResponse.error,
    });
    res.status(500).json(policyResponse.error);
    return;
  }

  const { id: policy_id } = policyResponse.data;

  const productPlanResponse = await ProductPlan.getById(productPlan_id);
  const productResponse = await Product.getById(product_id);

  const subscriptionResponse = await Subscription.create(
    productPlanResponse.data.price,
    productPlanResponse.data.plan_id
  );

  const leadResponse = await Lead.createModel(
    "",
    customer_id,
    company_id,
    agent_id,
    link,
    subscriptionResponse.data.subscription_id,
    policy_id,
    paymenttype_code
  );

  if (!leadResponse.success) {
    createLogger.error({
      model: "lead/create",
      error: leadResponse.error,
    });
    res.status(500).json(leadResponse.error);
    return;
  }

  const { id: lead_id } = leadResponse.data;

  const leadProductResponse = await LeadProduct.createModel(
    lead_id,
    product_id,
    productPlanResponse.data.price,
    productResponse.data.currency,
    productPlanResponse.data.frequency,
    productPlanResponse.data.plan_id
  );

  if (!leadProductResponse.success) {
    createLogger.error({
      model: "leadProduct/createModel",
      error: leadProductResponse.error,
    });
    res.status(500).json(leadProductResponse.error);
    return;
  }

  createLogger.info({
    controller: "lead/addProduct",
    message: "OK",
  });

  res.status(200).json(leadProductResponse.data);
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
    res.status(500).json(insuredResponse.error);
    return;
  }

  const { id: insured_id } = insuredResponse.data;

  const leadResponse = await Lead.getBySubscriptionId(subscription_id);

  if (!leadResponse.success) {
    createLogger.error({
      model: "lead/getBySubscriptionId",
      error: leadResponse.error,
    });

    res.status(500).json(leadResponse.error);
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
    res.status(500).json(leadInsuredResponse.error);
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
    res.status(500).json(beneficiaryResponse.error);
    return;
  }

  const { id: beneficiary_id } = beneficiaryResponse.data;

  const leadResponse = await Lead.getBySubscriptionId(subscription_id);

  if (!leadResponse.success) {
    createLogger.error({
      model: "lead/getBySubscriptionId",
      error: leadResponse.error,
    });

    res.status(500).json(leadResponse.error);
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
    res.status(500).json(leadBeneficiaryResponse.error);
    return;
  }

  createLogger.info({
    controller: "lead/addBeneficiary",
    message: "Lead Beneficiary created",
  });

  return res.status(200).json(leadBeneficiaryResponse.data);
};

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
};
