import axios from "axios";

import config from "../util/config";
import createLogger from "../util/logger";

import {
  createModel as createLeadModel,
  getById as getLeadById,
  getBySubscriptionId,
} from "../models/lead";
import {
  createModel as createLeadProductModel,
  getByLeadId as getProductByLeadId,
  getProductByInsuredId,
} from "../models/leadProduct";
import {
  createModel as createLeadInsuredtModel,
  getByLeadId as getInsuredByLeadId,
} from "../models/leadInsured";
import {
  createModel as createLeadBeneficiaryModel,
  getByLeadId as getBeneficiariesByLeadId,
  deleteByLeadId as deleteBeneficiariesByLeadId,
} from "../models/leadBeneficiary";

import { createModel as createCustomerModel } from "../models/customer";
import { createModel as createCompanyModel } from "../models/company";
import { createModel as createInsuredModel } from "../models/insured";
import { createModel as createBeneficiaryModel } from "../models/benericiary";

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
};

const createController = async (req: any, res: any) => {
  const { customer, company, product, insured, agent_id } = req.body;
  try {
    const insuredData: InsuredT[] = [];

    let customer_id: string | null = null;
    let company_id: string | null = null;
    let contractor: any;

    if (customer.rut !== "") {
      const customerResponse = await createCustomerModel(
        customer.rut,
        customer.name,
        customer.paternalLastName,
        customer.maternalLastName,
        customer.birthDate,
        customer.address,
        customer.district,
        customer.email,
        customer.phone
      );

      if (!customerResponse.success) {
        createLogger.error({
          model: "lead/createCustomerModel",
          error: customerResponse.error,
        });
        res
          .status(500)
          .json({ error: "createCustomerModel: " + customerResponse.error });
        return;
      }

      contractor = customerResponse.data;
      customer_id = contractor.id;
    }

    if (company.rut !== "") {
      const companyResponse = await createCompanyModel(
        company.rut,
        company.companyName,
        company.legalRepresentative,
        company.line,
        company.address,
        company.district,
        company.email,
        company.phone
      );

      if (!companyResponse.success) {
        createLogger.error({
          model: "lead/createCompanyModel",
          error: companyResponse.error,
        });
        res
          .status(500)
          .json({ error: "createCompapyModel: " + companyResponse.error });
        return;
      }

      contractor = companyResponse.data;
      company_id = contractor.id;
    }

    const leadResponse = await createLeadModel(
      customer_id,
      company_id,
      agent_id
    );

    if (!leadResponse.success) {
      createLogger.error({
        model: "lead/createLeadModel",
        error: leadResponse.error,
      });
      res.status(500).json({ error: "createLeadModel: " + leadResponse.error });
      return;
    }

    const { id: lead_id, createdate } = leadResponse.data;

    const leadProductResponse = await createLeadProductModel(
      lead_id,
      product.id,
      product.price,
      product.currency_code,
      product.frequency_code,
      product.productPlan_id
    );

    if (!leadProductResponse.success) {
      createLogger.error({
        model: "lead/createLeadProductModel",
        error: leadProductResponse.error,
      });
      res.status(500).json({
        error: "createLeadProductModel: " + leadProductResponse.error,
      });
      return;
    }

    insured.map(async (item: any) => {
      const insuredResponse = await createInsuredModel(
        item.rut,
        item.name,
        item.paternalLastName,
        item.maternalLastName,
        item.birthDate,
        item.address,
        item.district,
        item.email,
        item.phone
      );

      if (!insuredResponse.success) {
        createLogger.error({
          model: "lead/createInsuredModel",
          error: insuredResponse.error,
        });
        res
          .status(500)
          .json({ error: "createInsuredModel: " + insuredResponse.error });
        return;
      }

      const { id: insured_id } = insuredResponse.data;

      const leadInsuredResponse = await createLeadInsuredtModel(
        lead_id,
        insured_id
      );

      if (!leadInsuredResponse.success) {
        createLogger.error({
          model: "lead/createLeadInsuredModel",
          error: leadInsuredResponse.error,
        });
        res.status(500).json({
          error: "createLeadInsuredModel: " + leadInsuredResponse.error,
        });
        return;
      }

      const responseBeneficiaries = await addBeneficiariesData(
        item.beneficiaries,
        lead_id,
        insured_id
      );

      if (!responseBeneficiaries.success) {
        createLogger.error({
          model: "lead/addBeneficiariesData",
          error: responseBeneficiaries.error,
        });
        res.status(500).json({
          error: "createLeadBeneficiary: " + responseBeneficiaries.error,
        });
        return;
      }

      insuredData.push({
        id: insuredResponse.data.id,
        rut: insuredResponse.data.rut,
        name: insuredResponse.data.name,
        paternalLastName: insuredResponse.data.paternallastname,
        maternalLastName: insuredResponse.data.maternallastname,
        birthDate: insuredResponse.data.birthdate,
        address: insuredResponse.data.address,
        district: insuredResponse.data.district,
        email: insuredResponse.data.email,
        phone: insuredResponse.data.phone,
        beneficiaries: responseBeneficiaries.data
          ? responseBeneficiaries.data
          : [],
      });
    });

    const name =
      customer.rut !== ""
        ? contractor.name +
          " " +
          contractor.paternalLastName +
          " " +
          contractor.maternalLastName
        : contractor.companyName;
    const address = contractor.address + ", " + contractor.district;

    createLogger.info({
      model: config.reveniu.URL.subscription,
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

    const webhookResponse = await axios.post(config.webHook.URL.reveniu, {
      data: {
        data: {
          subscription_id,
          lead_id,
        },
      },
    });

    // const responseRegisterSubscription = await registerSubscriptionModel(
    //   lead_id,
    //   subscription_id,
    //   completion_url,
    //   security_token,
    //   status_code
    // );

    // if (!responseRegisterSubscription.success) {
    //   createLogger.error({
    //     model: "lead/registerSubscriptionModel",
    //     error: responseRegisterSubscription.error,
    //   });
    //   res.status(500).json({
    //     error:
    //       "registerSubscriptionModel: " + responseRegisterSubscription.error,
    //   });
    //   return;
    // }

    const leadResponseData = {
      id: lead_id,
      date: createdate,
      customer:
        customer.rut !== ""
          ? {
              id: contractor.id,
              rut: contractor.rut,
              name: contractor.name,
              paternalLastName: contractor.paternallastname,
              maternalLastName: contractor.maternallastname,
              birthDate: contractor.birthdate,
              address: contractor.address,
              district: contractor.district,
              email: contractor.email,
              phone: contractor.phone,
            }
          : {
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
      company:
        company.rut !== ""
          ? {
              id: contractor.id,
              rut: contractor.rut,
              companyName: contractor.companyname,
              legalRepresentative: contractor.legalrepresentative,
              line: contractor.line,
              address: contractor.address,
              district: contractor.district,
              email: contractor.email,
              phone: contractor.phone,
            }
          : {
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
      isActive: true,
    };

    createLogger.info({
      controller: "lead/createController",
      message: "OK",
    });
    res.status(200).json(leadResponseData);
  } catch (error) {
    createLogger.error({
      controller: "lead/CreateController",
      error: (error as Error).message,
    });
    res.status(500).json({ error });
    return;
  }
};

const getByIdController = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const leadResponse = await getLeadById(id);

    if (!leadResponse.success) {
      createLogger.error({
        model: "lead/getLeadById",
        error: leadResponse.error,
      });
      res.status(500).json({ error: leadResponse.error });
      return;
    }

    getData(leadResponse, res);
  } catch (error) {
    createLogger.error({
      controller: "lead/getByIdController",
      error: (error as Error).message,
    });
    res.status(500).json({ error });
    return;
  }
};

const getBySubscriptionIdController = async (req: any, res: any) => {
  const { subscription_id } = req.params;
  try {
    const leadResponse = await getBySubscriptionId(subscription_id);

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
    } = leadResponse.data;

    const leadProductResponse = await getProductByLeadId(id);

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

    const leadInsuredResponse = await getInsuredByLeadId(id);

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

    const leadBeneficiariesResponse = await getBeneficiariesByLeadId(id);

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

    leadInsuredResponse.data.map(async (item: any) => {
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
      });
    });

    const leadResponseData = {
      id: id,
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
    const leadResponse = await getProductByInsuredId(insured_id);

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

const addBeneficiariesData = async (
  beneficiaries: any,
  lead_id: string,
  insured_id: string
) => {
  const beneficiaryData: BeneficiaryT[] = [];

  const deleteBeneficiariesResponse = await deleteBeneficiariesByLeadId(
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
    const beneficiaryResponse = await createBeneficiaryModel(
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

    const leadbeneficiaryResponse = await createLeadBeneficiaryModel(
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

export {
  createController,
  addBeneficiariesController,
  getByIdController,
  getBySubscriptionIdController,
  getProductByInsuredIdController,
};
