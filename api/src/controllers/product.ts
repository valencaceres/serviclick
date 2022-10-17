import axios from "axios";

import config from "../util/config";
import createLogger from "../util/logger";

import * as Product from "../models/product";
import * as ProductCoverage from "../models/productCoverage";
import * as ProductFamilyValue from "../models/productFamilyValue";
import * as ProductPlan from "../models/productPlan";

type ProductT = {
  name: string;
  customerprice: number;
  companyprice: number;
  frequency: "U" | "S" | "M" | "A";
  dueday: number;
  customer_plan_id: number;
  company_plan_id: number;
};

const createProduct = async (req: any, res: any) => {
  const {
    family_id,
    name,
    cost,
    customerprice,
    companyprice,
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

  const productResponse = await Product.createProduct(
    family_id,
    name,
    cost,
    customerprice,
    companyprice,
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
    res.status(500).json({ error: productResponse.error });
    return;
  }

  const { id } = productResponse.data;

  const createdProductCoverages = await createProductCoverages(id, coverages);

  const createdProductFamilyValues = await createProductFamilyValues(
    id,
    familyValues
  );

  const responsePlans = await createProductPlans(id);

  if (!responsePlans.success) {
    res.status(500).json({ error: responsePlans.error });
    return;
  }

  createLogger.info({
    controller: "products/createProduct",
    message: "OK",
  });

  res.status(200).json({
    id,
    family_id,
    name,
    cost,
    price: { customer: customerprice, company: companyprice },
    isSubject,
    frequency,
    term,
    beneficiaries,
    minInsuredCompanyPrice,
    dueDay,
    plan: responsePlans.data,
    coverages: [...createdProductCoverages],
    familyValues: [...createdProductFamilyValues],
  });
};

const updateProduct = async (req: any, res: any) => {
  const { id } = req.params;
  const {
    family_id,
    name,
    cost,
    customerprice,
    companyprice,
    isSubject,
    frequency,
    term,
    beneficiaries,
    coverages,
    minInsuredCompanyPrice,
    dueDay,
    familyValues,
    currency,
  } = req.body;

  try {
    const productResponse = await Product.updateProduct(
      id,
      family_id,
      name,
      cost,
      customerprice,
      companyprice,
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
      res.status(500).json({ error: productResponse.error });
      return;
    }

    const deletedProductFamilyValues =
      await ProductFamilyValue.deleteProductFamilyValues(id);

    if (!deletedProductFamilyValues.success) {
      createLogger.error({
        model: "productFamily/deleteProductFamilyValues",
        error: deletedProductFamilyValues.error,
      });
      res.status(500).json({ error: deletedProductFamilyValues.error });
      return;
    }

    const deletedProductCoverages =
      await ProductCoverage.deleteProductCoverages(id);

    if (!deletedProductCoverages.success) {
      createLogger.error({
        model: "productFamily/deleteProductCoverages",
        error: deletedProductCoverages.error,
      });
      res.status(500).json({ error: deletedProductCoverages.error });
      return;
    }

    const createdProductCoverages = await createProductCoverages(id, coverages);

    const createdProductFamilyValues = await createProductFamilyValues(
      id,
      familyValues
    );

    const responsePlans = await createProductPlans(id);

    if (!responsePlans.success) {
      createLogger.error({
        controller: "product/createProductPlans",
        error: responsePlans.error,
      });
      res.status(500).json({ error: responsePlans.error });
      return;
    }

    createLogger.info({
      controller: "products/updateProduct",
      message: "OK",
    });

    res.status(200).json({
      id,
      family_id,
      name,
      cost,
      price: { customer: customerprice, company: companyprice },
      isSubject,
      frequency,
      term,
      beneficiaries,
      minInsuredCompanyPrice,
      dueDay,
      plan: responsePlans.data,
      coverages: [...createdProductCoverages],
      familyValues: [...createdProductFamilyValues],
      currency,
    });
  } catch (e) {
    createLogger.error({
      controller: "product/updateProduct",
      error: (e as Error).message,
    });
    res.status(500).json({ error: (e as Error).message });
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
    res.status(500).json({ error: productResponse.error });
    return;
  }

  createLogger.info({
    controller: "products/deleteProduct",
    message: "OK",
  });
  res.status(200).json(productResponse.data);
};

const listProducts = async (req: any, res: any) => {
  const productResponse = await Product.listProducts();

  if (!productResponse.success) {
    createLogger.error({
      model: "product/listProducts",
      error: productResponse.error,
    });
    res.status(500).json({ error: productResponse.error });
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
  const { family_id } = req.params;
  const productResponse = await Product.getProductByFamilyId(family_id);

  if (!productResponse.success) {
    createLogger.error({
      model: "product/getProductByFamilyId",
      error: productResponse.error,
    });
    res.status(500).json({ error: productResponse.error });
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

const getProduct = async (req: any, res: any) => {
  const { id } = req.params;
  const productResponse = await Product.getProduct(id);

  if (!productResponse.success) {
    createLogger.error({
      model: "product/getProduct",
      error: productResponse.error,
    });
    res.status(500).json({ error: productResponse.error });
    return;
  }

  const productFamilyValuesResponse =
    await ProductFamilyValue.listProductFamilyValues(id);
  if (!productFamilyValuesResponse.success) {
    createLogger.error({
      model: "product/listProductFamilyValues",
      error: productResponse.error,
    });
    res.status(500).json({ error: productFamilyValuesResponse.error });
    return;
  }

  const productCoveragesResponse = await ProductCoverage.listProductCoverages(
    id
  );
  if (!productCoveragesResponse.success) {
    createLogger.error({
      model: "product/listProductCoverages",
      error: productResponse.error,
    });
    res.status(500).json({ error: productCoveragesResponse.error });
    return;
  }

  const productPlansResponse = await ProductPlan.getByProductIdModel(id);
  if (!productPlansResponse.success) {
    createLogger.error({
      model: "product/getByProductIdModel",
      error: productResponse.error,
    });
    res.status(500).json({ error: productPlansResponse.error });
    return;
  }

  createLogger.info({
    controller: "products/getProduct",
    message: "OK",
  });

  res.status(200).json({
    id: productResponse.data.id,
    family_id: productResponse.data.family_id,
    name: productResponse.data.name,
    cost: productResponse.data.cost,
    price: {
      customer: productResponse.data.customerprice,
      company: productResponse.data.companyprice,
    },
    plan: {
      customer: {
        id: productResponse.data.customer_plan_id,
        price: productResponse.data.customer_plan_price,
      },
      company: {
        id: productResponse.data.company_plan_id,
        price: productResponse.data.company_plan_price,
      },
    },
    isSubject: productResponse.data.issubject,
    frequency: productResponse.data.frequency,
    term: productResponse.data.term,
    beneficiaries: productResponse.data.beneficiaries,
    minInsuredCompanyPrice: productResponse.data.mininsuredcompanyprice,
    coverages: [...productCoveragesResponse.data],
    familyValues: [...productFamilyValuesResponse.data],
    plans: [...productPlansResponse.data],
    currency: productResponse.data.currency,
    dueDay: productResponse.data.dueday,
  });
};

const createProductPlans = async (id: string) => {
  const trialCicles = 0;
  const discount = false;

  const productResponse = await Product.getProduct(id);

  if (!productResponse.success) {
    createLogger.error({
      model: "product/getProduct",
      error: productResponse.error,
    });
    return { success: false, error: productResponse.error };
  }

  const {
    name,
    customerprice,
    companyprice,
    frequency,
    dueday,
    customer_plan_id,
    company_plan_id,
  }: ProductT = productResponse.data;

  const productPlansDeleted = await Product.deletePlans(id);

  if (!productPlansDeleted.success) {
    createLogger.error({
      model: "product/deletePlans",
      error: productPlansDeleted.error,
    });
    return { success: false, error: productPlansDeleted.error };
  }

  const FrequencyCode = {
    U: 1,
    S: 2,
    M: 3,
    A: 4,
  };

  const productData = {
    frequency: FrequencyCode[frequency],
    cicles: 1,
    trial_cicles: trialCicles,
    title: name,
    description: name,
    is_custom_link: true,
    price: 0,
    is_uf: false,
    auto_renew: true,
    prefferred_due_day: dueday > 0 ? dueday : null,
    discount_enabled: discount,
    redirect_to: config.reveniu.feedbackURL.success,
    redirect_to_failure: config.reveniu.feedbackURL.error,
  };

  const planResponseCompany = await axios[
    company_plan_id > 0 ? "patch" : "post"
  ](
    `${config.reveniu.URL.plan}${company_plan_id > 0 ? company_plan_id : ""}`,
    {
      ...productData,
      is_custom_amount: true,
      price: companyprice,
    },
    {
      headers: config.reveniu.apiKey,
    }
  );

  const productPlanCompanyResponse = await ProductPlan.createModel(
    id,
    planResponseCompany.data.id,
    "company",
    companyprice,
    frequency
  );

  if (!productPlanCompanyResponse.success) {
    createLogger.error({
      model: "productPlan/createModel",
      error: productPlanCompanyResponse.error,
    });
    return { success: false, error: productPlanCompanyResponse.error };
  }

  // const planResponseCustomer = await axios[
  //   customer_plan_id > 0 ? "patch" : "post"
  // ](
  //   `${config.reveniu.URL.plan}${customer_plan_id > 0 ? customer_plan_id : ""}`,
  //   {
  //     ...productData,
  //     is_custom_amount: false,
  //     price: customerprice,
  //   },
  //   {
  //     headers: config.reveniu.apiKey,
  //   }
  // );

  // const productPlanCustomerResponse = await ProductPlan.createModel(
  //   id,
  //   planResponseCustomer.data.id,
  //   "customer",
  //   customerprice,
  //   frequency
  // );

  // if (!productPlanCustomerResponse.success) {
  //   createLogger.error({
  //     model: "productPlan/createModel",
  //     error: productPlanCustomerResponse.error,
  //   });
  //   return { success: false, error: productPlanCustomerResponse.error };
  // }

  return {
    success: true,
    data: {
      // customer: {
      //   id: planResponseCustomer.data.id,
      //   price: planResponseCustomer.data.price,
      // },
      company: {
        id: planResponseCompany.data.id,
        price: planResponseCompany.data.price,
      },
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

export {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  listProducts,
  getProductByFamilyId,
  createProductPlans,
};
