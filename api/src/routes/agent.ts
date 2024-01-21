import { Router } from "express";

import auth from "../middlewares/auth";
import {
  createAgent,
  updateAgent,
  deleteAgent,
  listAgents,
  getProcessById,
  getById
} from "../controllers/agent";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";

const AgentRouter = Router();

AgentRouter.get("/getById/:id", auth, getById);
AgentRouter.post("/create", auth, isAuthenticated, isAdmin, createAgent);
AgentRouter.put("/update/:id", auth, isAuthenticated, isAdmin, updateAgent);
AgentRouter.delete("/delete/:id", auth, isAuthenticated, isAdmin, deleteAgent);
AgentRouter.get("/list/:channel_id", auth, listAgents);
AgentRouter.get("/getProcessById/:id", auth, getProcessById);

export default AgentRouter;
