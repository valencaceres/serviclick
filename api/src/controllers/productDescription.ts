import createLogger from "../util/logger";

import * as ProductDescription from "../models/productDescription";

const getByProductId = async (req: any, res: any) => {
  const { lead_id, id } = req.params;

  const productResponse = await ProductDescription.getByProductId(lead_id, id);

  if (!productResponse.success) {
    createLogger.error({
      model: "productDescription/getByProductId",
      error: productResponse.error,
    });
    res.status(500).json({ error: "Error retrieving product description" });
    return;
  }

  createLogger.info({
    controller: "products/getByProductId",
    message: "OK",
  });

  res.status(200).json(productResponse.data);
};

export { getByProductId };
