import { ApiPaymentInstance } from "../../util/api";
import createLogger from '../../util/logger'

import axios from "axios";
import config from "../../util/config";

/* Imports que SI deben subirse a produccion */

import * as ProductPlan from '../../models/v2/productplan'

/* Imports que NO deben ir a produccion, llevan Prod al final para indicar que ya estan en produccion */

import * as Product from '../../models/product'
import * as Plan from '../../models/plan'

type ProductT = {
    name: string;
    alias: string;
    customerprice: number;
    companyprice: number;
    yearlyprice: number;
    frequency: "U" | "S" | "M" | "A";
    currency?: "P" | "U",
    dueday: number;
    productplan_id: string;
    customer_plan_id: number;
    company_plan_id: number;
    yearly_plan_id: number;
  };

  type DiscountT = {
    type: string;
    percent: number;
    cicles: number;
  };

  const createPlanGateway = async (req: any, res: any) => {
    const { product_id, agent_id, price, discount, beneficiary_price } = req.body;
    const responsePlans = await createProductPlanGateway(
      product_id,
      agent_id,
      price.base,
      price.customer,
      price.company,
      price.yearly,
      discount,
      beneficiary_price
    );
  
    if (!responsePlans?.success) {
      createLogger.error({
        controller: "product/createPlanGateway",
        error: responsePlans?.error,
      });
      res.status(500).json({ error: "Error creating product plans" });
      return;
    }
  
    createLogger.info({
      controller: "product/createPlanGateway",
      message: "OK",
    });
  
    res.status(200).json(responsePlans.data);
  };
  
  const createProductPlanGateway = async (
    id: string,
    agent_id: string,
    baseprice: number | null,
    customerprice: number | null,
    companyprice: number | null,
    yearlyprice: number | null,
    discount: DiscountT,
    beneficiary_price: number | null
  ) => {
    try {
      const productResponse = await Product.getProduct(id, agent_id);
      if (!productResponse.success) {
        createLogger.error({
          model: "product/getProduct",
          error: productResponse.error,
        });
        return { success: false, error: productResponse.error };
      }
      const {
        name,
        alias,
        frequency,
        currency,
        customer_plan_id,
        company_plan_id,
        yearly_plan_id,
      }: ProductT = productResponse.data;
  
      let yearly_plan_id_new = yearly_plan_id;
      let company_plan_id_new = company_plan_id;
      let customer_plan_id_new = customer_plan_id;
  
      let productData = {
        frequency,
        currency,
        name,
        alias,
        discount,
        customerprice,
      };
  
      let productPlanData: any = { ...productData };
  
      if (discount.type === "p" && discount.percent > 0 && discount.cicles > 0) {
        productPlanData = {
          ...productPlanData,
          coupon: {
            is_fixed: true,
            code: 1,
            discount_rate: discount.percent,
            discount_cicles: discount.cicles,
            discount_use_limit: 0,
          },
        };
      }
  
      let companyData: any = null;
      let customerData: any = null;
      let yearlyData: any = null;
      let is_custom_amount = false;
  
      if (
        productResponse.data.beneficiaries > 0 &&
        beneficiary_price &&
        beneficiary_price > 0
      ) {
        is_custom_amount = true;
      } else {
        is_custom_amount = false;
      }
  
      if (yearlyprice && yearlyprice > 0) {
        productPlanData.frecuency = 4;
  
        try {
          const planResponse = await axios.get(
            `${config.apiPayment}${yearly_plan_id_new}`,
            {
              headers: { id: config.apiPaymentKey },
            }
          );
        } catch (err) {
          createLogger.error({
            controller: "product/createProductPlans",
            error: (err as Error).message,
          });
          yearly_plan_id_new = 0;
        }
  
        const productPlanYearlyResponse =
          await ProductPlan.createProductPlanGateway(
            id,
            agent_id,
            "yearly",
            baseprice || 0,
            yearlyprice ?? 0,
            "A",
            discount,
            yearly_plan_id,
            beneficiary_price
          );
        if (!productPlanYearlyResponse.success) {
          createLogger.error({
            model: "productPlan/createModel",
            error: productPlanYearlyResponse.error,
          });
          return { success: false, error: productPlanYearlyResponse.error };
        }
  
        let dataToSend = {
          name: productPlanData.name,
          alias: productPlanData.alias,
          discount: productPlanData.discount,
          frequency: "A",
          currency: productPlanData.currency,
          is_custom_amount: is_custom_amount,
          price: yearlyprice ?? 0,
          productplan_id: productPlanYearlyResponse.data.id,
          buyerType: "yearly",
        };
        console.log(dataToSend)
        const planResponseYearly = await ApiPaymentInstance.post('/plan/upsert', dataToSend)
  
        createLogger.info({
          method: yearly_plan_id_new > 0 ? "patch" : "post",
          url: `${config.apiPayment}${
            yearly_plan_id_new > 0 ? yearly_plan_id_new : ""
          }`,
          data: {
            ...productPlanData,
            is_custom_amount: is_custom_amount,
            price: yearlyprice ?? 0,
          },
          response: planResponseYearly.data,
        });
  
        const gatewayData = planResponseYearly.data.data;
        let planId = productPlanYearlyResponse.data.id;
        for (const item of gatewayData) {
          if (item.method === "flow") {
            const collectorResponse = await ProductPlan.getCollectorByAlias(
              "flow"
            );
            const productPlanGatewayResponse = await ProductPlan.Gateway(
              item.planId,
              collectorResponse?.data.id,
              planId
            );
          } else if (item.method === `reveniu`) {
            const collectorResponse = await ProductPlan.getCollectorByAlias(
              "reveniu"
            );
            const productPlanGatewayResponse = await ProductPlan.Gateway(
              item.planId,
              collectorResponse?.data.id,
              planId
            );
          }
        }
        yearlyData = {
          price: yearlyprice,
          product_plan_id: productPlanYearlyResponse.data.id,
        };
      }
  
      if (companyprice && companyprice > 0) {
        let new_company_plan_id =
          company_plan_id_new > 0 ? company_plan_id_new : 0;
        let company_plan_id_extr =
          company_plan_id_new > 0 ? company_plan_id_new : 0;
        try {
          const planReveniuResponse = await axios.get(
            `${config.reveniu.URL.plan}${new_company_plan_id}`,
            {
              headers: config.reveniu.apiKey,
            }
          );
        } catch (err) {
          createLogger.error({
            controller: "product/createProductPlans",
            error: (err as Error).message,
          });
          new_company_plan_id = 0;
        }
  
        if (new_company_plan_id === 0) {
          const responsePlan = await Plan.create();
  
          if (!responsePlan.success) {
            createLogger.error({
              model: "plan/create",
              error: responsePlan.error,
            });
            return { success: false, error: responsePlan.error };
          }
  
          new_company_plan_id = responsePlan.data.id;
        }
        const productPlanCompanyResponse =
          await ProductPlan.createProductPlanGateway(
            id,
            agent_id,
            "company",
            baseprice,
            companyprice ?? 0,
            frequency,
            discount,
            company_plan_id_extr,
            beneficiary_price
          );
  
        if (!productPlanCompanyResponse.success) {
          createLogger.error({
            model: "productPlan/createModel",
            error: productPlanCompanyResponse.error,
          });
          return { success: false, error: productPlanCompanyResponse.error };
        }
  
        let dataToSend = {
          ...productPlanData,
          is_custom_amount: is_custom_amount,
          price: companyprice ?? 0,
          productplan_id: productPlanCompanyResponse.data.id,
          buyerType: "company",
        };
        if (customerprice && customerprice > 0) {
          const planResponseCompany = await ApiPaymentInstance.post('/plan/upsert', dataToSend)
          new_company_plan_id = planResponseCompany.data.id;
  
  
        const gatewayData = planResponseCompany.data.data;
  
        let planId = productPlanCompanyResponse.data.id;
        for (const item of gatewayData) {
          if (item.method === "flow") {
            const collectorResponse = await ProductPlan.getCollectorByAlias(
              "flow"
            );
            const productPlanGatewayResponse = await ProductPlan.Gateway(
              item.planId,
              collectorResponse?.data.id,
              planId
            );
          } else if (item.method === `reveniu`) {
            const collectorResponse = await ProductPlan.getCollectorByAlias(
              "reveniu"
            );
            const productPlanGatewayResponse = await ProductPlan.Gateway(
              item.planId,
              collectorResponse?.data.id,
              planId
            );
          }
        }
  
          createLogger.info({
            method: new_company_plan_id > 0 ? "patch" : "post",
            url: `${config.reveniu.URL.plan}${
              new_company_plan_id > 0 ? new_company_plan_id : ""
            }`,
            data: {
              ...productPlanData,
              is_custom_amount: true,
              price: companyprice ?? 0,
            },
            response: planResponseCompany.data,
          });
        }
  
        companyData = {
          productplan_id: productPlanCompanyResponse.data.id,
          price: companyprice ?? 0,
        };
      }
  
      if (customerprice && customerprice > 0) {
        try {
          const planResponse = await axios.get(
            `${config.apiPayment}/createProductPlan`,
            {
              headers: { id: config.apiPaymentKey },
            }
          );
        } catch (err) {
          createLogger.error({
            controller: "product/createProductPlans",
            error: (err as Error).message,
          });
          customer_plan_id_new = 0;
        }
  
        const productPlanCustomerResponse =
          await ProductPlan.createProductPlanGateway(
            id,
            agent_id,
            "customer",
            baseprice || 0,
            customerprice ?? 0,
            frequency,
            currency,
            discount,
            customer_plan_id,
            beneficiary_price
          );
        if (!productPlanCustomerResponse.success) {
          createLogger.error({
            model: "productPlan/createModel",
            error: productPlanCustomerResponse.error,
          });
          return { success: false, error: productPlanCustomerResponse.error };
        }
  
        let dataToSend = {
          ...productPlanData,
          is_custom_amount: is_custom_amount,
          price: customerprice ?? 0,
          productplan_id: productPlanCustomerResponse.data.id,
          buyerType: "customer",
        };
  
        const planResponseCustomer = await ApiPaymentInstance.post(
          "/plan/upsert",
          dataToSend
        );
  
        createLogger.info({
          method: customer_plan_id_new > 0 ? "patch" : "post",
          url: `${config.apiPayment}${
            customer_plan_id_new > 0 ? customer_plan_id_new : ""
          }`,
          data: {
            ...productPlanData,
            is_custom_amount: false,
            price: customerprice ?? 0,
          },
          response: planResponseCustomer.data,
        });
  
  
        const gatewayData = planResponseCustomer.data.data;
  
        let planId = productPlanCustomerResponse.data.id;
        for (const item of gatewayData) {
          if (item.method === "flow") {
            const collectorResponse = await ProductPlan.getCollectorByAlias(
              "flow"
            );
            const productPlanGatewayResponse = await ProductPlan.Gateway(
              item.planId,
              collectorResponse?.data.id,
              planId
            );
          } else if (item.method === `reveniu`) {
            const collectorResponse = await ProductPlan.getCollectorByAlias(
              "reveniu"
            );
            const productPlanGatewayResponse = await ProductPlan.Gateway(
              item.planId,
              collectorResponse?.data.id,
              planId
            );
          }
        }
  
        customerData = {
          price: customerprice,
          product_plan_id: productPlanCustomerResponse.data.id,
        };
      }
  
      return {
        success: true,
        data: {
          customer: customerData,
          company: companyData,
          yearly: yearlyData,
        },
      };
    } catch (e: any) {
      console.log({ "Error:": e.response?.data || e.message });
    }
  };

  const getPlanIdGateway = async (req: any, res: any) => {
    try {
      const { productplan_id, collector_id } = req.query;
  
      const response = await ProductPlan.getProductGatewayById(
        productplan_id,
        collector_id
      );
      if (!response.success) {
        return res.status(404).json({ error: "No product" });
      }
  
      return res
        .status(200)
        .json({ success: true, data: response.data, error: null });
    } catch (e) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  const getCollectorByAlias = async (req: any, res: any) => {
    try {
      const { alias } = req.query;
      const response = await ProductPlan.getCollectorByAlias(alias);
      if (!response?.success) {
        return res.status(404).json({ error: "No collector" });
      }
      return res
        .status(200)
        .json({ success: true, data: response.data, error: null });
    } catch (e) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  const getPlanByIdAndBrokerId = async (req: any, res: any) => {
    try {
      const { broker_id, productplan_id } = req.query;
      const response = await ProductPlan.getPlanByIdAndBrokerId(broker_id, productplan_id)
      if (!response?.success) {
        return res.status(404).json({ error: "No plan gateway" });
      }
      console.log('%capi\src\controllers\product.ts:1745 response', 'color: #007acc;', response);
      return res
        .status(200)
        .json({ success: true, data: response.data, error: null });
    } catch (e) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  export {
    createPlanGateway,
    getPlanIdGateway,
    getCollectorByAlias,
    createProductPlanGateway,
    getPlanByIdAndBrokerId
  }