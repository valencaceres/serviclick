import { Router } from "express";

import auth from "../middlewares/auth";
import {
  create,
  addProduct,
  removeProduct,
  getAll,
  getById,
  getByRut,
  updateLogo,
  deleteById,
  getFamiliesByRetailId,
  getProductsByRetailIdAndFamilyId,
  getCollectById,
  getAgents,
  updateAgent,
} from "../controllers/retail";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";

const RetailRouter = Router();

RetailRouter.post("/create", auth, isAuthenticated, isAdmin, create);
RetailRouter.post("/addProduct", auth, isAuthenticated, isAdmin, addProduct);
RetailRouter.post("/removeProduct", auth, isAuthenticated, removeProduct);
RetailRouter.get("/getAll", auth, getAll);
RetailRouter.get("/getById/:id", auth, getById);
RetailRouter.get("/getByRut/:rut", auth, getByRut);
RetailRouter.get("/getFamiliesByRetailId/:id", auth, getFamiliesByRetailId);
RetailRouter.get(
  "/getProductsByRetailIdAndFamilyId/:id/:family_id",
  auth,
  getProductsByRetailIdAndFamilyId
);
RetailRouter.get("/getCollectById/:id", auth, getCollectById);
RetailRouter.put("/updateLogo/:id", isAuthenticated, isAdmin, updateLogo);
RetailRouter.delete(
  "/deleteById/:id",
  auth,
  isAuthenticated,
  isAdmin,
  deleteById
);
RetailRouter.get("/getAgents/:id", auth, getAgents);
RetailRouter.put(
  "/updateAgent/:retailId",
  auth,
  isAuthenticated,
  isAdmin,
  updateAgent
);

export default RetailRouter;
