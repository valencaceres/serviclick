import axios from "axios";

import config from "../util/config";
import createLogger from "../util/logger";

import * as Product from "../models/product";
import * as ProductCoverage from "../models/productCoverage";
import * as ProductFamilyValue from "../models/productFamilyValue";
import * as ProductPlan from "../models/productPlan";

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
    familyValues,
    currency,
  } = req.body;

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
    currency
  );

  if (productResponse.success) {
    createLogger.error({
      model: "product/updateProduct",
      error: productResponse.error,
    });
    res.status(500).json({ error: productResponse.error });
    return;
  }

  const deletedProductFamilyValues =
    await ProductFamilyValue.deleteProductFamilyValues(id);

  const deletedProductCoverages = await ProductCoverage.deleteProductCoverages(
    id
  );

  if (deletedProductFamilyValues.success && deletedProductCoverages.success) {
    const createdProductCoverages = await createProductCoverages(id, coverages);

    const createdProductFamilyValues = await createProductFamilyValues(
      id,
      familyValues
    );

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
      coverages: [...createdProductCoverages],
      familyValues: [...createdProductFamilyValues],
      currency,
    });
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

  createLogger.info({
    controller: "products/listProducts",
    message: "OK",
  });
  res.status(200).json(productResponse.data);
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
    isSubject: productResponse.data.issubject,
    frequency: productResponse.data.frequency,
    term: productResponse.data.term,
    beneficiaries: productResponse.data.beneficiaries,
    coverages: [...productCoveragesResponse.data],
    familyValues: [...productFamilyValuesResponse.data],
    plans: [...productPlansResponse.data],
    currency: productResponse.data.currency,
  });
};

const createProductPlans = async (req: any, res: any) => {
  const { id } = req.params;
  const { dueDay, trialCicles, discount } = req.body;

  const productPlansDeleted = await Product.deletePlans(id);
  if (!productPlansDeleted.success) {
    createLogger.error({
      model: "product/deletePlans",
      error: productPlansDeleted.error,
    });
    res.status(500).json({ error: productPlansDeleted.error });
    return;
  }

  const productResponse = await Product.getProduct(id);
  if (!productResponse.success) {
    createLogger.error({
      model: "product/getProduct",
      error: productResponse.error,
    });
    res.status(500).json({ error: productResponse.error });
    return;
  }

  type ProductT = {
    name: string;
    customerprice: string;
    companyprice: string;
    frequency: "U" | "M" | "S" | "A";
    currency: string;
  };

  const { name, customerprice, companyprice, frequency, currency }: ProductT =
    productResponse.data;

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
    is_uf: currency === "UF",
    auto_renew: true,
    prefferred_due_day: dueDay,
    discount_enabled: discount,
    redirect_to: config.reveniu.feedbackURL.success,
    redirect_to_failure: config.reveniu.feedbackURL.error,
  };

  try {
    const planResponseCompany = await axios.post(
      config.reveniu.URL.plan,
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

    const planResponseCustomer = await axios.post(
      config.reveniu.URL.plan,
      {
        ...productData,
        price: customerprice,
      },
      {
        headers: config.reveniu.apiKey,
      }
    );

    const productPlanCustomerResponse = await ProductPlan.createModel(
      id,
      planResponseCustomer.data.id,
      "customer",
      customerprice,
      frequency
    );

    createLogger.info({
      controller: "products/createProductPlans",
      message: "OK",
    });

    res
      .status(200)
      .json([productPlanCompanyResponse, productPlanCustomerResponse]);
  } catch (error) {
    createLogger.error({
      controller: "product/productData",
      error: (error as Error).message,
    });
    res.status(500).json({ error });
    return;
  }
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
          coverage.events
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
  createProductPlans,
};
