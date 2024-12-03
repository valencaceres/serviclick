import { Router } from "express";
import auth from "../../middlewares/auth";

import {
    addProductGateway,
    getByIdGateway,
    removeProductGateway
} from '../../controllers/v2/broker'

const BrokerRouterV2 = Router()

BrokerRouterV2.post("/addProductGateway", auth, addProductGateway);
BrokerRouterV2.post("/removeProductGateway", auth, removeProductGateway);
BrokerRouterV2.get("/getByIdGateway/:id", auth, getByIdGateway);

export default BrokerRouterV2