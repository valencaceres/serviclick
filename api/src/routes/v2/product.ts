import { Router } from "express";
import auth from "../../middlewares/auth";

import {
    createPlanGateway,
    getPlanIdGateway,
    getCollectorByAlias,
    getPlanByIdAndBrokerId
} from '../../controllers/v2/product'

const ProductRouterV2 = Router()

ProductRouterV2.post("/createProductPlanGateway", auth, createPlanGateway)
ProductRouterV2.get("/getPlanIdGateway", auth, getPlanIdGateway)
ProductRouterV2.get("/getCollectorByAlias", auth, getCollectorByAlias)
ProductRouterV2.get("/getPlanByIdAndBrokerId", auth, getPlanByIdAndBrokerId)

export default ProductRouterV2