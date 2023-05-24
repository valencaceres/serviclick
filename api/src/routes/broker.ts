import { Router } from "express";

import auth from "../middlewares/auth";
import {
  create,
  addProduct,
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

const BrokerRouter = Router();

BrokerRouter.post("/create", auth, create);
BrokerRouter.post("/addProduct", auth, addProduct);
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
BrokerRouter.put("/updateLogo/:id", updateLogo);
BrokerRouter.delete("/deleteById/:id", auth, deleteById);
BrokerRouter.get("/getAgents/:id", auth, getAgents);
BrokerRouter.put("/updateAgent/:brokerId", auth, updateAgent);

export default BrokerRouter;
