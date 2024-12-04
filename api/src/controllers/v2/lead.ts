import createLogger from '../../util/logger'

/* Imports que SI deben ir a produccion */

import * as Lead from '../../models/v2/lead'
import * as LeadProduct from '../../models/v2/leadProduct'
import * as Subscription from '../../models/v2/subscription'

/* Imports que NO deben ir a produccion, llevan Prod al final para indicar que ya estan en produccion */

import { createCustomer, createBeneficiary, createCompany, createInsured, createLead, createLeadInsured, deleteLeadBeneficiaries, deleteLeadInsured, createLeadBeneficiary, sendPaymentLink, updateLeadPaymentType } from '../lead'
import * as LeadProductValues from '../../models/leadProductValue'
import * as LeadProd from '../../models/lead'
import * as LeadInsured from '../../models/leadInsured'
import * as LeadBeneficiary from '../../models/leadBeneficiary'

import config from '../../util/config';
import { ApiPaymentInstance } from '../../util/api';

type ProductTGateway = {
    product_id: string;
    price: number;
    currency_code: string;
    frequency_code: string;
    plan_id: number;
    beneficiary_price: number;
  };

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

  type LeadT = {
    id: string;
    customer: CustomerT;
    company: CompanyT;
    product: ProductTGateway;
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
      plan_id: 0,
      beneficiary_price: 0,
    },
    insured: [],
    subscription: {},
  };

  const createGatewayProduct = async (id: string, product: any) => {
    const leadProductResponse = await LeadProduct.createGatewayModel(
      id,
      product.id,
      product.price,
      product.currency_code,
      product.frequency_code,
      product.plan_id
    );
    return errorHandler(leadProductResponse, "lead/createLeadProductModel");
  };

  const createSubscriptionGateway = async (
    lead_id: string,
    customer: CustomerT,
    company: CompanyT,
    product: ProductTGateway,
    insured: InsuredT[],
    method: string,
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
  
      const dataToSend = {
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
        planId: product.plan_id,
        lead_id
      }
  
      console.log(dataToSend)
  
      if(method === 'reveniu'){
        createLogger.info({
          url: `${config.apiPayment}/subscription/create?method=reveniu&plan_id=${product.plan_id}`,
          method: "POST",
          body: {
            dataToSend
          },
          params: "",
          query: "",
        });
  
        const subscriptionReveniuResponse = await ApiPaymentInstance.post(
          `/subscription/create?method=${method}&plan_id=${product.plan_id}`, dataToSend,
        );
        const {
          id: subscription_id,
          completion_url,
          security_token,
          status_code
      } = subscriptionReveniuResponse.data.data
  
      const leadResponse = await Lead.updateSubscriptionGateway(
        lead_id,
        subscription_id
      );
  
      if (!leadResponse.success) {
        createLogger.error({
          model: "lead/updateSubscriptionGateway",
          error: leadResponse.error,
        });
        return {
          success: false,
          data: null,
          error: leadResponse.error,
        };
      }
  
      const subscriptionGatewayResponse = await Subscription.getCollector(method)
  
      const subscriptionModelResponse = await Subscription.createModelGateway(
        subscriptionGatewayResponse.data.collector_id,
        product.plan_id,
        subscription_id
      );
  
      if (!subscriptionModelResponse.success) {
        createLogger.error({
          model: "subscription/createModel",
          error: subscriptionModelResponse.error,
        });
        return {
          success: false,
          error: subscriptionModelResponse.error,
        };
      }
  
      return {
        success: true,
        data: {
          id: subscription_id,
          completion_url,
          security_token,
          status_code
        },
        error: null,
      };
  
      }
      if(method === 'flow'){
        createLogger.info({
          url: `${config.apiPayment}/subscription/create?method=${method}&plan_id=${product.plan_id}`,
          method: "POST",
          body: {
            plan_id: product.plan_id,
          },
          params: "",
          query: "",
        });
  
        const subscriptionFlowResponse = await ApiPaymentInstance.post(
          `/subscription/create?method=${method}&plan_id=${product.plan_id}`, dataToSend
        );
        const {subscriptionId, planId, paymentLink} = subscriptionFlowResponse.data.data.data
        const leadResponse = await Lead.updateSubscriptionGateway(
          lead_id,
          subscriptionId
        );
  
        if (!leadResponse.success) {
          createLogger.error({
            model: "lead/updateSubscriptionGateway",
            error: leadResponse.error,
          });
          return {
            success: false,
            data: null,
            error: leadResponse.error,
          };
        }
  
        const subscriptionGatewayResponse = await Subscription.getCollector(method)
  
        const subscriptionModelResponse = await Subscription.createModelGateway(
          subscriptionGatewayResponse.data.collector_id,
          planId,
          subscriptionId
        );
  
        if (!subscriptionModelResponse.success) {
          createLogger.error({
            model: "subscription/createModel",
            error: subscriptionModelResponse.error,
          });
          return {
            success: false,
            error: subscriptionModelResponse.error,
          };
        }
  
        return {
          success: true,
          data: {
            subscriptionId,
            planId,
            paymentLink
          },
          error: null,
        };
      }
    } catch (e) {
      return { success: false, data: null, error: (e as Error).message };
    }
  };

  export const createGateway = async (lead: any) => {
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
  
      const { data: leadProductData } = await createGatewayProduct(
        leadDataResponse.id,
        lead.product
      );
      leadDataResponse = { ...leadDataResponse, product: leadProductData };
      if (insured) {
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

  const createControllerGateway = async (req: any, res: any) => {
    try {
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
        method,
      } = req.body;
      if (insured.length > 0 && !customer.birthDate) {
        customer.birthDate = insured[0].birthDate;
      }
      let { success, data, error } = await createGateway({
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
          function: "lead/createGateway",
          error,
        });
        res.status(500).json({ error: "error creating lead" });
        return;
      }
      if (send) {
        const emailResponse = await sendPaymentLink(data, link);
        if (!emailResponse.success) {
          createLogger.error({
            function: "lead/sendPaymentLinkGateway",
            error: emailResponse.error,
          });
          res.status(500).json({ error: "error sending payment link" });
          return;
        }
        const responseLeadUpdate = await updateLeadPaymentType(data.id, "L");
        if (!responseLeadUpdate.success) {
          createLogger.error({
            function: "lead/updateLeadPaymentTypeGateway",
            error: responseLeadUpdate.error,
          });
          res.status(500).json({ error: "error updating lead payment type " });
          return;
        }
      }
      if (subscription) {
        const subscriptionResponse = await createSubscriptionGateway(
          data.id,
          data.customer,
          data.company,
          product,
          data.insured,
          method
        );
  
        if (!subscriptionResponse?.success) {
          createLogger.error({
            function: "lead/createSubscriptionGateway",
            error: subscriptionResponse?.error,
          });
          res.status(500).json({ error: "error creating subscription" });
          return;
        }
        data = { ...data, subscription: subscriptionResponse.data };
      }
  
      createLogger.info({
        controller: "lead/createControllerGateway",
      message: "OK",
      });
      console.log(data)
      res.status(200).json({success: true, data: data, error: null});
    } catch (e: any) {
      return res.status(500).json({error: (e as Error).message})
    }
  };

  const getByIdControllerGateway = async (req: any, res: any) => {
    const { id } = req.params;
    try {
      const leadResponse = await LeadProd.getById(id);
  
      if (!leadResponse.success) {
        createLogger.error({
          model: "lead/getByIdGateway",
          error: leadResponse.error,
        });
        res.status(500).json({ error: "Error retrieving lead" });
        return;
      }
      getDataGateway(leadResponse, res);
    } catch (error) {
      createLogger.error({
        controller: "lead/getByIdGateway",
        error: (error as Error).message,
      });
      res.status(500).json({ error: "Error retrieving lead" });
      return;
    }
  };

  const getDataGateway = async (leadResponse: any, res: any) => {
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
      const leadProductResponse = await LeadProduct.getByLeadIdGateway(id);
  
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

  export {    
    createControllerGateway,
    getByIdControllerGateway
}