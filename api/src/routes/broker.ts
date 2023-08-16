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
  getFamiliesByBrokerId,
  getProductsByBrokerIdAndFamilyId,
  getCollectById,
  getAgents,
  updateAgent,
} from "../controllers/broker";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";

const BrokerRouter = Router();

BrokerRouter.post("/create", auth, isAuthenticated, isAdmin, create);
BrokerRouter.post("/addProduct", auth, isAuthenticated, isAdmin, addProduct);
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
BrokerRouter.get("/getCollectById/:id", auth, getCollectById);
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

export default BrokerRouter;
