import { Router } from "express";

import auth from "../middlewares/auth";
import {
  getItems,
  createItem,
  deleteItem,
  orderItem,
  updateItem,
} from "../controllers/web";

const WebRouter = Router();

WebRouter.get("/getHero", auth, getItems);
WebRouter.post("/createHero", auth, createItem);
WebRouter.put("/orderHero", auth, orderItem);
WebRouter.delete("/deleteHeroById/:id", auth, deleteItem);
WebRouter.put("/updateHero", auth, updateItem);

export default WebRouter;
