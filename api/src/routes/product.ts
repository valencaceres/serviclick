import { Router } from "express";

import auth from "../middlewares/auth";
import {
  createProduct,
  assignPrices,
  updateProduct,
  deleteProduct,
  getProduct,
  listProducts,
  getProductByFamilyId,
} from "../controllers/product";

const ProductRouter = Router();

ProductRouter.post("/create", auth, createProduct);
ProductRouter.post("/assignPrices", auth, assignPrices);
ProductRouter.put("/update/:id", auth, updateProduct);
ProductRouter.delete("/delete/:id", auth, deleteProduct);
ProductRouter.get("/list/:agent_id", auth, listProducts);
ProductRouter.get(
  "/getByFamilyId/:agent_id/:family_id",
  auth,
  getProductByFamilyId
);
ProductRouter.get("/get/:id/:agent_id", auth, getProduct);

export default ProductRouter;
