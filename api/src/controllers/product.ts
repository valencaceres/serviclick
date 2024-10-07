import axios from "axios";

import config from "../util/config";
import createLogger from "../util/logger";

import * as Product from "../models/product";
import * as ProductDescription from "../models/productDescription";
import * as productAssistance from "../models/productAssistance";
import * as ProductCoverage from "../models/productCoverage";
import * as ProductFamilyValue from "../models/productFamilyValue";
import * as ProductPlan from "../models/productPlan";
import * as Value from "../models/value";
import * as Plan from "../models/plan";
import * as Retail from '../models/retail'
import fs from "fs";
import dirPath from "path";

type ProductT = {
  name: string;
  alias: string;
  customerprice: number;
  companyprice: number;
  yearlyprice: number;
  frequency: "U" | "S" | "M" | "A";
  dueday: number;

  customer_plan_id: number;
  company_plan_id: number;
  yearly_plan_id: number;
};

type DiscountT = {
  type: string;
  percent: number;
  cicles: number;
};

const createProduct = async (req: any, res: any) => {
  const {
    id: product_id,
    family_id,
    name,
    cost,
    dynamiccharge,
    isSubject,
    frequency,
    term,
    beneficiaries,
    currency,
    dueDay,
    minInsuredCompanyPrice,
    title,
    subTitle,
    alias,
    promotional,
    description,
    territorialScope,
    hiringConditions,
    assistances,
  } = req.body;

  const productResponse = await Product.createProduct(
    product_id,
    family_id,
    name,
    cost,
    dynamiccharge,
    isSubject,
    frequency,
    term,
    beneficiaries,
    minInsuredCompanyPrice,
    dueDay,
    currency
  );

  if (!productResponse.success) {
    createLogger.error({
      model: "product/createProduct",
      error: productResponse.error,
    });
    res.status(500).json({ error: "Error creating product" });
    return;
  }

  const { id } = productResponse.data;

  const productDescriptionResponse = await ProductDescription.create(
    id,
    title,
    subTitle,
    alias,
    promotional,
    description,
    territorialScope,
    hiringConditions
  );

  if (!productDescriptionResponse.success) {
    createLogger.error({
      model: "productDescription/create",
      error: productDescriptionResponse.error,
    });
    res.status(500).json({ error: "Error creating product description" });
    return;
  }

  const existingAssistances = await productAssistance.getByProductId(id);

  if (!existingAssistances.success) {
    createLogger.error({
      model: "productAssistance/getByProductId",
      error: existingAssistances.error,
    });
    res.status(500).json({ error: "Error retrieving product assistance" });
    return;
  }

  const existingAssistancesArray = existingAssistances.data;

  for (const existingAssistance of existingAssistancesArray) {
    const foundAssistance = assistances.find(
      (assistance: any) => assistance.id === existingAssistance.id
    );

    if (!foundAssistance) {
      const deleteResponse = await productAssistance.deleteById(
        existingAssistance.id
      );

      if (!deleteResponse.success) {
        createLogger.error({
          model: "productAssistance/deleteById",
          error: deleteResponse.error,
        });
        res.status(500).json({ error: "Error deleting product assistance" });
        return;
      }
    }
  }

  let line_order = 1;
  for (const assistance of assistances) {
    const addValue = await productAssistance.create(
      id,
      assistance.id,
      line_order,
      assistance.amount,
      assistance.maximum,
      assistance.events,
      assistance.lack,
      assistance.currency
    );

    if (!addValue.success) {
      createLogger.error({
        model: "productAssistance/create",
        error: addValue.error,
      });
      res.status(500).json({ error: "Error creating product assistance" });
      return;
    }
    line_order++;
  }

  createLogger.info({
    controller: "products/createProduct",
    message: "OK",
  });

  const productByIdResponse = await Product.getById(id);

  if (!productByIdResponse.success) {
    createLogger.error({
      model: "product/getById",
      error: productByIdResponse.error,
    });

    res.status(500).json({ error: "Error retrieving product" });
    return;
  }

  res.status(200).json(productByIdResponse.data);
};

const createPlans = async (req: any, res: any) => {
  const { product_id, agent_id, price, discount, beneficiary_price } = req.body;
  const responsePlans = await createProductPlans(
    product_id,
    agent_id,
    price.base,
    price.customer,
    price.company,
    price.yearly,
    discount,
    beneficiary_price
  );

  if (!responsePlans.success) {
    createLogger.error({
      controller: "product/createProductPlans",
      error: responsePlans.error,
    });
    res.status(500).json({ error: "Error creating product plans" });
    return;
  }

  createLogger.info({
    controller: "product/createPlans",
    message: "OK",
  });

  res.status(200).json(responsePlans.data);
};

const assignPrices = async (req: any, res: any) => {
  const {
    id,
    agent_id,
    baseprice,
    customerprice,
    companyprice,
    yearlyprice,
    discount,
    beneficiary_price,
  } = req.body;
  const responsePlans = await createProductPlans(
    id,
    agent_id,
    baseprice,
    customerprice,
    companyprice,
    yearlyprice,
    discount,
    beneficiary_price
  );

  if (!responsePlans.success) {
    createLogger.error({
      controller: "product/createProductPlans",
      error: responsePlans.error,
    });
    res.status(500).json({ error: "Error creating product plans" });
    return;
  }

  createLogger.info({
    controller: "product/assignPrices",
    message: "OK",
  });

  res.status(200).json(responsePlans);
};

const updateProduct = async (req: any, res: any) => {
  const { id } = req.params;
  const {
    family_id,
    name,
    cost,
    isSubject,
    frequency,
    term,
    beneficiaries,
    minInsuredCompanyPrice,
    dueDay,
    coverages,
    familyValues,
    currency,
  } = req.body;

  try {
    const productResponse = await Product.updateProduct(
      id,
      family_id,
      name,
      cost,
      isSubject,
      frequency,
      term,
      beneficiaries,
      minInsuredCompanyPrice,
      dueDay,
      currency
    );

    if (!productResponse.success) {
      createLogger.error({
        model: "product/updateProduct",
        error: productResponse.error,
      });
      res.status(500).json({ error: "Error updating product" });
      return;
    }

    const deletedProductFamilyValues =
      await ProductFamilyValue.deleteProductFamilyValues(id);

    if (!deletedProductFamilyValues.success) {
      createLogger.error({
        model: "productFamily/deleteProductFamilyValues",
        error: deletedProductFamilyValues.error,
      });
      res.status(500).json({ error: "Error deleting product family value" });
      return;
    }

    const deletedProductCoverages =
      await ProductCoverage.deleteProductCoverages(id);

    if (!deletedProductCoverages.success) {
      createLogger.error({
        model: "productFamily/deleteProductCoverages",
        error: deletedProductCoverages.error,
      });
      res.status(500).json({ error: "Error deleting product coverage" });
      return;
    }

    const createdProductCoverages = await createProductCoverages(id, coverages);

    const createdProductFamilyValues = await createProductFamilyValues(
      id,
      familyValues
    );

    res.status(200).json({
      id,
      family_id,
      name,
      cost,
      price: {},
      isSubject,
      frequency,
      term,
      beneficiaries,
      minInsuredCompanyPrice,
      dueDay,
      plan: {},
      coverages: [...createdProductCoverages],
      familyValues: [...createdProductFamilyValues],
      currency,
    });
  } catch (e) {
    createLogger.error({
      controller: "product/updateProduct",
      error: (e as Error).message,
    });
    res.status(500).json({ error: "Error updating product" });
    return;
  }
};

const deleteProduct = async (req: any, res: any) => {
  const { id } = req.params;
  const productResponse = await Product.deleteProduct(id);

  if (!productResponse.success) {
    createLogger.error({
      model: "product/deleteProduct",
      error: productResponse.error,
    });
    res.status(500).json({ error: "Error deleting product" });
    return;
  }

  createLogger.info({
    controller: "products/deleteProduct",
    message: "OK",
  });
  res.status(200).json(productResponse.data);
};

const listProducts = async (req: any, res: any) => {
  const { agent_id } = req.params;
  const productResponse = await Product.listProducts(agent_id);

  if (!productResponse.success) {
    createLogger.error({
      model: "product/listProducts",
      error: productResponse.error,
    });
    res.status(500).json({ error: "Error listing products" });
    return;
  }

  const data = productResponse.data.map((row: any) => {
    return {
      id: row.id,
      family_id: row.family_id,
      family_name: row.family_name,
      alias: row.alias,
      promotional: row.promotional,
      name: row.name,
      cost: row.cost,
      price: {
        customer: row.customerprice,
        company: row.companyprice,
      },
      plan: {
        customer: { id: row.customer_plan_id, price: row.customer_plan_price },
        company: { id: row.company_plan_id, price: row.company_plan_price },
        yearly: { id: row.yearly_plan_id, price: row.yearly_plan_price },
      },
      isSubject: row.issubject,
      frequency: row.frequency,
      term: row.term,
      beneficiaries: row.beneficiaries,
      minInsuredCompanyPrice: row.mininsuredcompanyprice,
      currency: row.currency,
      dueDay: row.dueday,
    };
  });

  createLogger.info({
    controller: "products/listProducts",
    message: "OK",
  });
  res.status(200).json(data);
};

const getProductByFamilyId = async (req: any, res: any) => {
  const { agent_id, family_id } = req.params;
  const productResponse = await Product.getProductByFamilyId(
    family_id,
    agent_id
  );

  if (!productResponse.success) {
    createLogger.error({
      model: "product/getProductByFamilyId",
      error: productResponse.error,
    });
    res.status(500).json({ error: "Error retrieving product" });
    return;
  }

  const data = productResponse.data.map((row: any) => {
    return {
      id: row.id,
      family_id: row.family_id,
      family_name: row.family_name,
      name: row.name,
      cost: row.cost,
      price: {
        customer: row.customerprice,
        company: row.companyprice,
      },
      plan: {
        customer: { id: row.customer_plan_id, price: row.customer_plan_price },
        company: { id: row.company_plan_id, price: row.company_plan_price },
        yearly: { id: row.yearly_plan_id, price: row.yearly_plan_price },
      },
      isSubject: row.issubject,
      frequency: row.frequency,
      term: row.term,
      beneficiaries: row.beneficiaries,
      minInsuredCompanyPrice: row.mininsuredcompanyprice,
      dueDay: row.dueday,
      currency: row.currency,
    };
  });

  createLogger.info({
    controller: "products/getProductByFamilyId",
    message: "OK",
  });
  res.status(200).json(data);
};

const getFamilies = async (req: any, res: any) => {
  const productResponse = await Product.getFamilies();

  if (!productResponse.success) {
    createLogger.error({
      model: "product/getFamilies",
      error: productResponse.error,
    });

    res.status(500).json({ error: "Error retrieving product families" });
    return;
  }

  createLogger.info({
    controller: "products/getFamilies",
    message: "OK",
  });
  res.status(200).json(productResponse.data);
};

const getById = async (req: any, res: any) => {
  const { id } = req.params;

  const productResponse = await Product.getById(id);

  if (!productResponse.success) {
    createLogger.error({
      model: "product/getById",
      error: productResponse.error,
    });

    res.status(500).json({ error: "Error retrieving product" });
    return;
  }

  createLogger.info({
    controller: "products/getById",
    message: "OK",
  });
  res.status(200).json(productResponse.data);
};

const getByIdWithPrices = async (req: any, res: any) => {
  const { id, agent_id } = req.params;

  const productResponse = await Product.getById(id);

  if (!productResponse.success) {
    createLogger.error({
      model: "product/getById",
      error: productResponse.error,
    });

    res.status(500).json({ error: "Error retrieving product" });
    return;
  }

  // const productResponse = await Product.getProduct(id, agent_id);

  // if (!productResponse.success) {
  //   createLogger.error({
  //     model: "product/getProduct",
  //     error: productResponse.error,
  //   });
  //   res.status(500).json({ error: "Error retrieving product" });
  //   return;
  // }

  // const productFamilyValuesResponse =
  //   await ProductFamilyValue.listProductFamilyValues(id);
  // if (!productFamilyValuesResponse.success) {
  //   createLogger.error({
  //     model: "product/listProductFamilyValues",
  //     error: productResponse.error,
  //   });
  //   res.status(500).json({ error: "Errro listing product family" });
  //   return;
  // }

  // const productCoveragesResponse = await ProductCoverage.listProductCoverages(
  //   id
  // );
  // if (!productCoveragesResponse.success) {
  //   createLogger.error({
  //     model: "product/listProductCoverages",
  //     error: productResponse.error,
  //   });
  //   res.status(500).json({ error: "Error listing product coverage" });
  //   return;
  // }

  const productPlansResponse = await ProductPlan.getByProductIdModel(
    id,
    agent_id
  );
  if (!productPlansResponse.success) {
    createLogger.error({
      model: "product/getByProductIdModel",
      error: productResponse.error,
    });
    res.status(500).json({ error: "Error retrieving product plans" });
    return;
  }

  createLogger.info({
    controller: "products/getProduct",
    message: "OK",
  });

  res.status(200).json({
    ...productResponse.data,
    plan: {
      customer: productPlansResponse.data.filter(
        (item: any) => item.type === "customer"
      )[0],
      company: productPlansResponse.data.filter(
        (item: any) => item.type === "company"
      )[0],
    },
  });
  return;

  // res.status(200).json({
  //   id: productResponse.data.id,
  //   family_id: productResponse.data.family_id,
  //   name: productResponse.data.name,
  //   cost: productResponse.data.cost,
  //   price: {
  //     customer: productResponse.data.customerprice,
  //     company: productResponse.data.companyprice,
  //   },
  //   plan: {
  //     customer: {
  //       id: productResponse.data.customer_plan_id,
  //       price: productResponse.data.customer_plan_price,
  //     },
  //     company: {
  //       id: productResponse.data.company_plan_id,
  //       price: productResponse.data.company_plan_price,
  //     },
  //   },
  //   isSubject: productResponse.data.issubject,
  //   frequency: productResponse.data.frequency,
  //   term: productResponse.data.term,
  //   beneficiaries: productResponse.data.beneficiaries,
  //   minInsuredCompanyPrice: productResponse.data.mininsuredcompanyprice,
  //   coverages: [...productCoveragesResponse.data],
  //   familyValues: [...productFamilyValuesResponse.data],
  //   plans: [...productPlansResponse.data],
  //   currency: productResponse.data.currency,
  //   dueDay: productResponse.data.dueday,
  // });
};

const insertPdf = async (product_plan_id: string, pdfBase64: string) => {
  const productPdfResponse = await ProductPlan.insertPdf(
    product_plan_id,
    pdfBase64
  );
  if (!productPdfResponse.success) {
    createLogger.error({
      model: "productPlan/insertPdf",
      error: productPdfResponse.error,
    });
    return { success: false, error: productPdfResponse.error };
  }
  return { success: true, data: productPdfResponse.data };
};

const createProductPlans = async (
  id: string,
  agent_id: string,
  baseprice: number | null,
  customerprice: number | null,
  companyprice: number | null,
  yearlyprice: number | null,
  discount: DiscountT,
  beneficiary_price: number | null
) => {
  const retailResponse = await Retail.getById(agent_id)
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
    dueday,
    customer_plan_id,
    company_plan_id,
    yearly_plan_id,
  }: ProductT = productResponse.data;
  let yearly_plan_id_new = yearly_plan_id;
  let company_plan_id_new = company_plan_id;
  let customer_plan_id_new = customer_plan_id;
  // const productPlansDeleted = await Product.deletePlans(id, agent_id);

  // if (!productPlansDeleted.success) {
  //   createLogger.error({
  //     model: "product/deletePlans",
  //     error: productPlansDeleted.error,
  //   });
  //   return { success: false, error: productPlansDeleted.error };
  // }

  const FrequencyCode = {
    U: 1,
    S: 2,
    M: 3,
    A: 4,
  };
  const frecuencyData = FrequencyCode[frequency];
  let productData = {
    frequency: FrequencyCode[frequency],
    cicles: 1,
    trial_cicles:
      discount.type === "t" && discount.cicles > 0 ? discount.cicles : 0,
    title: name,
    description: name + " " + "(" + alias + ")",
    is_custom_link: true,
    price: 0,
    is_uf: false,
    auto_renew: true,
    prefferred_due_day: dueday > 0 ? dueday : null,
    discount_enabled: discount.type === "p" && discount.percent > 0,
    success_message:
      "Muchas gracias por preferirnos, ya eres parte de ServiClick!",
    redirect_to: config.reveniu.feedbackURL.success,
    redirect_to_failure: config.reveniu.feedbackURL.error,
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
    productPlanData.frequency = 4;

    if(!retailResponse.data){
      try {
        const planReveniuResponse = await axios.get(
          `${config.reveniu.URL.plan}${yearly_plan_id_new}`,
          {
            headers: config.reveniu.apiKey,
          }
        );
      } catch (err) {
        createLogger.error({
          controller: "product/createProductPlans",
          error: "Error 404 - Not found yearly_plan will be replaced by 0",
        });
        yearly_plan_id_new = 0;
      }
    }

    const planResponseYearly = await axios[
      yearly_plan_id_new > 0 ? "patch" : "post"
    ](
      `${config.reveniu.URL.plan}${
        yearly_plan_id_new > 0 ? yearly_plan_id_new : ""
      }`,
      {
        ...productPlanData,
        is_custom_amount: is_custom_amount,
        price: yearlyprice ?? 0,
      },
      {
        headers: config.reveniu.apiKey,
      }
    );

    createLogger.info({
      method: yearly_plan_id_new > 0 ? "patch" : "post",
      url: `${config.reveniu.URL.plan}${
        yearly_plan_id_new > 0 ? yearly_plan_id_new : ""
      }`,
      data: {
        ...productPlanData,
        is_custom_amount: is_custom_amount,
        price: yearlyprice ?? 0,
      },
      response: planResponseYearly.data,
    });

    const productPlanYearlyResponse = await ProductPlan.createModel(
      id,
      agent_id,
      planResponseYearly.data.id,
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

    yearlyData = {
      id: planResponseYearly.data.id,
      price: planResponseYearly.data.price,
      product_plan_id: productPlanYearlyResponse.data.id,
    };
  }

  if (companyprice && companyprice > 0) {
    productPlanData.frequency = frecuencyData;
    let new_company_plan_id = company_plan_id_new > 0 ? company_plan_id_new : 0;
    let company_plan_id_extr =
      company_plan_id_new > 0 ? company_plan_id_new : 0;
    if(!retailResponse.data){
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
          error: "Error 404 - Not found yearly_plan will be replaced by 0",
        });
        new_company_plan_id = 0;
      }
    }

    if (customerprice && customerprice > 0) {
      const planResponseCompany = await axios[
        new_company_plan_id > 0 ? "patch" : "post"
      ](
        `${config.reveniu.URL.plan}${
          new_company_plan_id > 0 ? new_company_plan_id : ""
        }`,
        {
          ...productPlanData,
          is_custom_amount: true,
          price: companyprice ?? 0,
        },
        {
          headers: config.reveniu.apiKey,
        }
      );

      new_company_plan_id = planResponseCompany.data.id;

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
    const productPlanCompanyResponse = await ProductPlan.createModel(
      id,
      agent_id,
      new_company_plan_id,
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

    companyData = {
      id: new_company_plan_id,
      price: companyprice ?? 0,
      product_plan_id: productPlanCompanyResponse.data.id,
    };
  }

  if (customerprice && customerprice > 0) {
    productPlanData.frequency = frecuencyData;
    if(!retailResponse.data){
      try {
        const planReveniuResponse = await axios.get(
          `${config.reveniu.URL.plan}${customer_plan_id_new}`,
          {
            headers: config.reveniu.apiKey,
          }
        );
      } catch (err) {
        createLogger.error({
          controller: "product/createProductPlans",
          error: "Error 404 - Not found yearly_plan will be replaced by 0",
        });
        customer_plan_id_new = 0;
      }
    }

    const planResponseCustomer = await axios[
      customer_plan_id_new > 0 ? "patch" : "post"
    ](
      `${config.reveniu.URL.plan}${
        customer_plan_id_new > 0 ? customer_plan_id_new : ""
      }`,
      {
        ...productPlanData,
        is_custom_amount: is_custom_amount,
        price: customerprice ?? 0,
      },
      {
        headers: config.reveniu.apiKey,
      }
    );

    createLogger.info({
      method: customer_plan_id_new > 0 ? "patch" : "post",
      url: `${config.reveniu.URL.plan}${
        customer_plan_id_new > 0 ? customer_plan_id_new : ""
      }`,
      data: {
        ...productPlanData,
        is_custom_amount: false,
        price: customerprice ?? 0,
      },
      response: planResponseCustomer.data,
    });
    const productPlanCustomerResponse = await ProductPlan.createModel(
      id,
      agent_id,
      planResponseCustomer.data.id,
      "customer",
      baseprice || 0,
      customerprice ?? 0,
      frequency,
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

    customerData = {
      id: planResponseCustomer.data.id,
      price: planResponseCustomer.data.price,
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
};

const createProductCoverages = async (id: string, coverages: any) => {
  const errors: any = [];

  const createdProductCoverages = await Promise.all(
    coverages.map(async (coverage: any) => {
      const productCoverageRespose =
        await ProductCoverage.createProductCoverage(
          id,
          coverage.id,
          coverage.name,
          coverage.amount,
          coverage.maximum,
          coverage.lack,
          coverage.events,
          coverage.isCombined
        );
      if (!productCoverageRespose.success) {
        createLogger.error({
          model: "product/createProductCoverage",
          error: productCoverageRespose.error,
        });
        errors.push(productCoverageRespose.error);
      }

      return productCoverageRespose.data;
    })
  );

  createLogger.info({
    controller: "products/createProductCoverages",
    message: "OK",
  });
  return createdProductCoverages;
};

const createProductFamilyValues = async (id: string, familyValues: any) => {
  const errors: any = [];

  const createdProductFamilyValues = await Promise.all(
    familyValues.map(async (familyValue: any) => {
      const productFamilyValueRespose =
        await ProductFamilyValue.createProductFamilyValue(
          id,
          familyValue.familyvalue_id,
          familyValue.name
        );
      if (!productFamilyValueRespose.success) {
        createLogger.error({
          model: "product/createProductFamilyValue",
          error: productFamilyValueRespose.error,
        });

        errors.push(productFamilyValueRespose.error);
      }

      return productFamilyValueRespose.data;
    })
  );

  createLogger.info({
    controller: "products/createProductFamilyValues",
    message: "OK",
  });
  return createdProductFamilyValues;
};

const getByProductPlanId = async (req: any, res: any) => {
  const { productplan_id } = req.params;

  const productPlanResponse = await ProductPlan.getProductById(productplan_id);

  if (!productPlanResponse.success) {
    createLogger.error({
      model: "productPlan/getProductById",
      error: productPlanResponse.error,
    });

    res.status(500).json({ error: "Error retrieving product plans" });
    return;
  }

  if (productPlanResponse.data.length === 0) {
    res.status(500).json("Product not found");
    return;
  }

  const valueResponse = await Value.getByProductId(
    productPlanResponse.data[0].id
  );

  if (!valueResponse.success) {
    createLogger.error({
      model: "value/getByProductId",
      error: valueResponse.error,
    });

    res.status(500).json({ error: "Error retrieving value" });
    return;
  }

  const data = {
    id: productPlanResponse.data[0].id,
    familyId: productPlanResponse.data[0].family_id,
    name: productPlanResponse.data[0].name,
    promotional: productPlanResponse.data[0].promotional,
    cost: productPlanResponse.data[0].cost,
    isSubject: productPlanResponse.data[0].issubject,
    frequency: productPlanResponse.data[0].frequency,
    term: productPlanResponse.data[0].term,
    beneficiaries: productPlanResponse.data[0].beneficiaries,
    currency: productPlanResponse.data[0].currency,
    minInsuredCompanyPrice: productPlanResponse.data[0].mininsuredcompanyprice,
    dueDay: productPlanResponse.data[0].dueday,
    plan: {
      id: productPlanResponse.data[0].productplan_id,
      beneficiary_price: productPlanResponse.data[0].beneficiary_price,
      createDate: productPlanResponse.data[0].createdate,
      planId: productPlanResponse.data[0].plan_id,
      customerType: productPlanResponse.data[0].customer_type,
      baseprice: productPlanResponse.data[0].baseprice,
      price: productPlanResponse.data[0].price,
      frequencyCode: productPlanResponse.data[0].frequency,
      agentId: productPlanResponse.data[0].agent_id,
      discount: {
        type: productPlanResponse.data[0].discount_type,
        percent: productPlanResponse.data[0].discount_percent,
        cicles: productPlanResponse.data[0].discount_cicles,
      },
    },
    assistances: productPlanResponse.data.map((assistance: any) => {
      return {
        id: assistance.assistance_id,
        name: assistance.assistance_name,
        amount: assistance.amount,
        currency: assistance.currency,
        maximum: assistance.maximum,
        events: assistance.events,
        lack: assistance.lack,
      };
    }),
    values: valueResponse.data,
  };

  createLogger.info({
    controller: "products/getByProductPlanId",
    message: "OK",
  });
  res.status(200).json(data);
};

const getAll = async (req: any, res: any) => {
  const result = await Product.getAll();

  if (!result.success) {
    createLogger.error({
      model: "product/getAll",
      error: result.error,
    });

    res.status(500).json({ error: "Error retrieving products" });
    return;
  }

  createLogger.info({
    controller: "products/getAll",
    message: "OK",
  });

  return res.status(200).json(result.data);
};

const getByRetailRut = async (req: any, res: any) => {
  const { rut } = req.params;

  const result = await Product.getByRetailRut(rut);

  if (!result.success) {
    createLogger.error({
      model: "product/getByRetailRut",
      error: result.error,
    });

    return res.status(500).json({ error: "Error retrieving product" });
  }

  createLogger.info({
    controller: "products/getByRetailRut",
    message: "OK",
  });

  return res.status(200).json(result.data);
};

const listByFamilies = async (req: any, res: any) => {
  const { agent } = req.params;

  const result = await Product.listByFamilies(agent);
  const filteredData = result?.data?.filter(
    (item: any) =>
      item.hasOwnProperty("family_name") && item.family_name === "Veterinaria"
  );
  if (!result.success) {
    createLogger.error({
      model: "product/listByFamilies",
      error: result.error,
    });
    res.status(500).json({ error: "Error listing product" });
    return;
  }

  createLogger.info({
    controller: "products/listByFamilies",
    message: "OK",
  });

  return res.status(200).json(result.data);
};

const getSuscriptionsByAgentId = async (req: any, res: any) => {
  const { agent } = req.params;

  const result = await Product.getSuscriptionsByAgentId(agent);

  if (!result.success) {
    createLogger.error({
      model: "product/getSuscriptionsByAgentId",
      error: result.error,
    });

    res.status(500).json({ error: "Error listing product" });
    return;
  }

  createLogger.info({
    controller: "products/getSuscriptionsByAgentId",
    message: "OK",
  });

  return res.status(200).json(result.data);
};

const getPdfContractById = async (req: any, res: any) => {
  try {
    const { productplan_id } = req.params;

    const rutaVirtual = `/files/pdf/products/${productplan_id}.pdf`;
    const response = await axios.get(`${process.env.API_URL}${rutaVirtual}`, {
      responseType: "arraybuffer",
    });
    const base64 = response.data.toString("base64");

    if (response.status === 200) {
      res.send({
        base64,
      });
    } else {
      res.status(404).json({ error: "PDF not found" });
    }

    createLogger.info({
      controller: "products/getPdfContractById",
      message: "OK",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getContract = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const response = await ProductPlan.contract(id);

    if (!response.success) {
      return res.status(404).json({ error: "No pdf" });
    }
    const pdfBase64 = response.data.base64;
    return res
      .status(200)
      .json({ success: true, data: pdfBase64, error: null });
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getBase64ByProductPlanId = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const response = await ProductPlan.getBase64ById(id);

    if (!response.success) {
      return res.status(404).json({ error: "No pdf" });
    }
    const pdfBase64 = response.data.base64;
    return res
      .status(200)
      .json({ success: true, data: pdfBase64, error: null });
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  createProduct,
  createPlans,
  updateProduct,
  getAll,
  deleteProduct,
  getById,
  getByIdWithPrices,
  listProducts,
  getProductByFamilyId,
  assignPrices,
  createProductPlans,
  getFamilies,
  getByProductPlanId,
  getByRetailRut,
  listByFamilies,
  getPdfContractById,
  getSuscriptionsByAgentId,
  insertPdf,
  getContract,
  getBase64ByProductPlanId,
};
