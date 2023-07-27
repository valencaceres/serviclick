import { Router } from "express";

import auth from "../middlewares/auth";
import {
  createProduct,
  createPlans,
  assignPrices,
  updateProduct,
  deleteProduct,
  getByIdWithPrices,
  listProducts,
  getProductByFamilyId,
  getById,
  getFamilies,
  getByProductPlanId,
  getAll,
  getByRetailRut,
  listByFamilies,
} from "../controllers/product";

const ProductRouter = Router();

ProductRouter.post("/create", auth, createProduct);
ProductRouter.post("/createPlans", auth, createPlans);
ProductRouter.post("/assignPrices", auth, assignPrices);
ProductRouter.put("/update/:id", auth, updateProduct);
ProductRouter.delete("/delete/:id", auth, deleteProduct);
ProductRouter.get("/list/:agent_id", auth, listProducts);
ProductRouter.get(
  "/getByFamilyId/:agent_id/:family_id",
  auth,
  getProductByFamilyId
);
ProductRouter.get("/getById/:id", auth, getById);
ProductRouter.get("/getByIdWithPrices/:id/:agent_id", auth, getByIdWithPrices);
ProductRouter.get("/getFamilies", auth, getFamilies);
ProductRouter.get(
  "/getByProductPlanId/:productplan_id",
  auth,
  getByProductPlanId
);
ProductRouter.get("/getAll", auth, getAll);
ProductRouter.get("/getByRetailRut/:rut", auth, getByRetailRut);
ProductRouter.get("/listByFamilies/:agent", auth, listByFamilies);

export default ProductRouter;
