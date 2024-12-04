import { Router } from "express";
import auth from "../../middlewares/auth";

import {
    createControllerGateway ,
    getByIdControllerGateway
} from '../../controllers/v2/lead'

const LeadRouterV2 = Router()

LeadRouterV2.post("/createGateway", auth, createControllerGateway);
LeadRouterV2.get("/getByIdGateway/:id", auth, getByIdControllerGateway);

export default LeadRouterV2