import { Router } from "express";

import auth from "../middlewares/auth";
import {
  createAgent,
  updateAgent,
  deleteAgent,
  listAgents,
  getProcessById,
  getById,
  getDataById,
  postAgentProductPlan,
  addProduct
} from "../controllers/agent";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";
import authMiddleware from "../middlewares/isAdminWithoutClerk";

const AgentRouter = Router();

AgentRouter.get("/getById/:id", auth, getById);
AgentRouter.post("/create", auth, isAuthenticated, isAdmin, createAgent);
AgentRouter.put("/update/:id", auth, isAuthenticated, isAdmin, updateAgent);
AgentRouter.delete("/delete/:id", auth, authMiddleware, deleteAgent);
AgentRouter.get("/list/:channel_id", auth, listAgents);
AgentRouter.get("/getProcessById/:id", auth, getProcessById);
AgentRouter.get("/getDataById/:id", getDataById);
AgentRouter.post("/PostAgentProductPlan/:id", postAgentProductPlan)
AgentRouter.post("/addProduct", addProduct);

export default AgentRouter;
