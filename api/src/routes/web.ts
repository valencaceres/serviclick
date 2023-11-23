import { Router } from "express";

import auth from "../middlewares/auth";
import { getHero, getNews } from "../controllers/web";

const WebRouter = Router();

WebRouter.get("/getHero", getHero);
WebRouter.get("/getNews", getNews);

export default WebRouter;
