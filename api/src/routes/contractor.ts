import { Router } from "express";

import auth from "../middlewares/auth";
import {
  create,
  getAll,
  getById,
  getByRut,
  getSubscriptionsById,
  getSubscriptionById,
  getInsuredBySubscriptionId,
  getPaymentById,
  getProductsByContractor,
} from "../controllers/contractor";

const ContractorRouter = Router();

ContractorRouter.post("/create", auth, create);
ContractorRouter.post("/getAll", auth, getAll);
ContractorRouter.get("/getById/:id", auth, getById);
ContractorRouter.get("/getByRut/:rut/:type", auth, getByRut);
ContractorRouter.get("/getSubscriptionsById/:id", auth, getSubscriptionsById);
ContractorRouter.get("/getSubscriptionById/:id", auth, getSubscriptionById);
ContractorRouter.get(
  "/getInsuredBySubscriptionId/:id",
  auth,
  getInsuredBySubscriptionId
);
ContractorRouter.get("/getPaymentById/:id", auth, getPaymentById);
ContractorRouter.get(
  "/getProductsByContractor/:id",
  auth,
  getProductsByContractor
);

export default ContractorRouter;
