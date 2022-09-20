import { Router } from "express";

import auth from "../middlewares/auth";
import {
  createChannel,
  updateChannel,
  deleteChannel,
  listChannels,
} from "../controllers/channel";

const ChannelRouter = Router();

ChannelRouter.post("/create", auth, createChannel);
ChannelRouter.put("/update/:id", auth, updateChannel);
ChannelRouter.delete("/delete/:id", auth, deleteChannel);
ChannelRouter.get("/list", auth, listChannels);

export default ChannelRouter;
