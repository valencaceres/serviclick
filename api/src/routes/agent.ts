import { Router } from "express";

import auth from "../middlewares/auth";
import {
  createAgent,
  updateAgent,
  deleteAgent,
  listAgents,
} from "../controllers/agent";

const AgentRouter = Router();

AgentRouter.post("/create", auth, createAgent);
AgentRouter.put("/update/:id", auth, updateAgent);
AgentRouter.delete("/delete/:id", auth, deleteAgent);
AgentRouter.get("/list/:channel_id", auth, listAgents);

export default AgentRouter;
