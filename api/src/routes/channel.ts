import { Router } from "express";

import auth from "../middlewares/auth";
import {
  createChannel,
  updateChannel,
  deleteChannel,
  listChannels,
} from "../controllers/channel";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";

const ChannelRouter = Router();

ChannelRouter.post("/create", auth, isAuthenticated, isAdmin, createChannel);
ChannelRouter.put("/update/:id", auth, isAuthenticated, isAdmin, updateChannel);
ChannelRouter.delete("/delete/:id", auth, isAuthenticated, isAdmin, deleteChannel);
ChannelRouter.get("/list", auth, listChannels);

export default ChannelRouter;
