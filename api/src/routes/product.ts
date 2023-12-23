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
  getPdfContractById,
} from "../controllers/product";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";

const ProductRouter = Router();

ProductRouter.post("/create", auth, isAuthenticated, isAdmin, createProduct);
ProductRouter.post("/createPlans", auth, isAuthenticated, isAdmin, createPlans);
ProductRouter.post(
  "/assignPrices",
  auth,
  isAuthenticated,
  isAdmin,
  assignPrices
);
ProductRouter.put("/update/:id", auth, isAuthenticated, isAdmin, updateProduct);
ProductRouter.delete(
  "/delete/:id",
  auth,
  isAuthenticated,
  isAdmin,
  deleteProduct
);
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
ProductRouter.get("/getContract/:productplan_id", getPdfContractById);
export default ProductRouter;
