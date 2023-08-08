import { Router } from "express";

import auth from "../middlewares/auth";
import {
  create,
  getAll,
  getById,
  getByRut,
  updateLogo,
  deleteById,
  getFamiliesByRetailId,
  getProductsByRetailIdAndFamilyId,
} from "../controllers/retail";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";

const RetailRouter = Router();

RetailRouter.post("/create", auth, create);
RetailRouter.get("/getAll", auth, getAll);
RetailRouter.get("/getById/:id", auth, getById);
RetailRouter.get("/getByRut/:rut", auth, getByRut);
RetailRouter.get("/getFamiliesByRetailId/:id", auth, getFamiliesByRetailId);
RetailRouter.get(
  "/getProductsByRetailIdAndFamilyId/:id/:family_id",
  auth,
  getProductsByRetailIdAndFamilyId
);
RetailRouter.put("/updateLogo/:id", updateLogo);
RetailRouter.delete("/deleteById/:id", auth, deleteById);

export default RetailRouter;
