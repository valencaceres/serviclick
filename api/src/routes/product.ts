import { Router } from "express";

import auth from "../middlewares/auth";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  listProducts,
  createProductPlans,
} from "../controllers/product";

const ProductRouter = Router();

ProductRouter.post("/create", auth, createProduct);
ProductRouter.put("/update/:id", auth, updateProduct);
ProductRouter.delete("/delete/:id", auth, deleteProduct);
ProductRouter.get("/get/:id", auth, getProduct);
ProductRouter.get("/list", auth, listProducts);
ProductRouter.post("/createPlans/:id", auth, createProductPlans);

export default ProductRouter;
