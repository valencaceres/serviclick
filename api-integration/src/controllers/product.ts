import createLogger from "../util/logger";
import * as Product from "../models/product";

const getAll = async (req: any, res: any) => {
    const {agent_id} = req.body
  const productResponse = await Product.getAll(agent_id);

  if (!productResponse.success) {
    createLogger.error({
      model: "product/getAll",
      error: productResponse.error,
    });
    res.status(500).json({ error: "Error retrieving products" });
    return;
  }

  createLogger.info({
    controller: "product/getAll",
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
      controller: "product/getById",
      message: "OK",
    });
    res.status(200).json(productResponse.data);
  };
  

export { getAll, getById };
