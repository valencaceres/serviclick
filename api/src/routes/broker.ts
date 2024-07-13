import { Router } from "express";
import auth from "../middlewares/auth";
import {
  create,
  addProduct,
  removeProduct,
  getAll,
  getById,
  getByRut,
  getByUserId,
  getProductsById,
  getCollectionById,
  updateLogo,
  deleteById,
  getFamiliesByBrokerId,
  getProductsByBrokerIdAndFamilyId,
  getCollectById,
  getAgents,
  updateAgent,
  removeAgent,
  getAssistancesByBrokerIdAndProductId
} from "../controllers/broker";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";
import authMiddleware from "../middlewares/isAdminWithoutClerk";
 const BrokerRouter = Router();

BrokerRouter.post("/create", auth, isAuthenticated, isAdmin, create);
BrokerRouter.post("/addProduct", auth, addProduct);
BrokerRouter.post("/removeProduct", auth, isAuthenticated, removeProduct);
BrokerRouter.get("/getAll", auth, getAll);
BrokerRouter.get("/getById/:id", auth, getById);
BrokerRouter.get("/getByRut/:rut", auth, getByRut);
BrokerRouter.get("/getFamiliesByBrokerId/:id", auth, getFamiliesByBrokerId);
BrokerRouter.get(
  "/getProductsByBrokerIdAndFamilyId/:id/:family_id",
  auth,
  getProductsByBrokerIdAndFamilyId
);
BrokerRouter.get("/getByUserId/:user_id", auth, getByUserId);
BrokerRouter.get("/getCollectById/:id", auth, getCollectById);
BrokerRouter.get("/getProductsById/:id", auth, getProductsById);
BrokerRouter.get("/getCollectionById/:id", auth, getCollectionById);
BrokerRouter.put("/updateLogo/:id", isAuthenticated, isAdmin, updateLogo);
BrokerRouter.delete(
  "/deleteById/:id",
  auth,
  isAuthenticated,
  isAdmin,
  deleteById
);
BrokerRouter.get("/getAgents/:id", auth, getAgents);
BrokerRouter.put(
  "/updateAgent/:brokerId",
  auth,
  isAuthenticated,
  isAdmin,
  updateAgent
);

BrokerRouter.delete("/removeAgent", auth, isAuthenticated, isAdmin, removeAgent);
BrokerRouter.get("/getAssistancesByBrokerIdAndProductId", auth, getAssistancesByBrokerIdAndProductId)

export default BrokerRouter;
