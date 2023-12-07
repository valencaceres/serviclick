import { Router } from "express";
import multer from "multer";

import auth from "../middlewares/auth";
import {
  create,
  addProduct,
  removeProduct,
  getAll,
  getBySearchValues,
  getCustomersByRetailIdAndProductId,
  getById,
  getByUserId,
  getProductsById,
  getCollectionById,
  getByRut,
  updateLogo,
  updatePaymentCodes,
  deleteById,
  getFamiliesByRetailId,
  getProductsByRetailIdAndFamilyId,
  getCollectById,
  getAgents,
  getPayments,
  updateAgent,
  addLeadFromExcel,
  getProductsAndRetail,
} from "../controllers/retail";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fieldNameSize: 300,
    fileSize: 10 * 1024 * 1024, // 10 Mb
  },
});

const RetailRouter = Router();

RetailRouter.post("/create", auth, isAuthenticated, isAdmin, create);
RetailRouter.post("/addProduct", auth, isAuthenticated, isAdmin, addProduct);
RetailRouter.post("/removeProduct", auth, isAuthenticated, removeProduct);
RetailRouter.get("/getAll", auth, getAll);
RetailRouter.post("/getBySearchValues", auth, getBySearchValues);
RetailRouter.get(
  "/getCustomersByRetailIdAndProductId/:retail_id/:productPlan_id",
  auth,
  getCustomersByRetailIdAndProductId
);
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
RetailRouter.post("/updatePaymentCodes", auth, updatePaymentCodes);
RetailRouter.delete(
  "/deleteById/:id",
  auth,
  isAuthenticated,
  isAdmin,
  deleteById
);
RetailRouter.get("/getAgents/:id", auth, getAgents);
RetailRouter.get("/getByUserId/:user_id", getByUserId);
RetailRouter.get("/getProductsById/:id", getProductsById);
RetailRouter.get("/getCollectionById/:id", getCollectionById);
RetailRouter.get("/getPayments/:id", getPayments);
RetailRouter.get("/getProductsAndRetail", getProductsAndRetail);
RetailRouter.put(
  "/updateAgent/:retailId",
  auth,
  isAuthenticated,
  isAdmin,
  updateAgent
);
RetailRouter.post(
  "/addLeadFromExcel",
  auth,
  isAuthenticated,
  isAdmin,
  upload.single("file"),
  addLeadFromExcel
);

export default RetailRouter;
