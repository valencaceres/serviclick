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

WebRouter.get("/getHero", getItems);
WebRouter.post("/createHero", createItem);
WebRouter.put("/orderHero", orderItem);
WebRouter.delete("/deleteHeroById/:id", deleteItem);
WebRouter.put("/updateHero", updateItem);

export default WebRouter;
