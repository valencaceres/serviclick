import createLogger from "../util/logger";
import * as Product from "../models/product";

const getAll = async (req: any, res: any) => {
  const { retail_id } = req.body;
  const productResponse = await Product.getAll(retail_id);

  if (!productResponse.success) {
    createLogger.error({
      model: "product/getAll",
      error: productResponse.error,
    });
    res
      .status(500)
      .json({ success: false, data: null, error: "Error retrieving products" });
    return;
  }

  createLogger.info({
    controller: "product/getAll",
    message: "OK",
  });
  res
    .status(200)
    .json({ success: true, data: productResponse.data, error: null });
};

const getById = async (req: any, res: any) => {
  const { id } = req.params;
  const { retail_id } = req.body;

  const productResponse = await Product.getById(retail_id, id);

  if (!productResponse.success) {
    createLogger.error({
      model: "product/getById",
      error: productResponse.error,
    });
    res
      .status(500)
      .json({ success: false, data: null, error: "Error retrieving product" });
    return;
  }

  createLogger.info({
    controller: "product/getById",
    message: "OK",
  });
  res
    .status(200)
    .json({ success: true, data: productResponse.data, error: null });
};

export { getAll, getById };
