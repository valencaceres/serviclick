import { Router } from "express";

import auth from "../middlewares/auth";
import { getByRutController, create, getCustomerAccountByRut, updateCustomerAccount } from "../controllers/customer";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";

const CustomerRouter = Router();

CustomerRouter.post("/create", auth, isAuthenticated, isAdmin, create);
CustomerRouter.get("/getByRut/:rut", auth, getByRutController);
CustomerRouter.get("/getCustomerAccount/:rut", auth, getCustomerAccountByRut)
CustomerRouter.put("/updateCustomerAccount", auth, updateCustomerAccount)

export default CustomerRouter;
