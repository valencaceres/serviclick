import { Router } from "express";

import auth from "../middlewares/auth";
import { getByProductId } from "../controllers/productDescription";

const ProductDescriptionRouter = Router();

ProductDescriptionRouter.get(
  "/getByProductId/:lead_id/:id",
  auth,
  getByProductId
);

export default ProductDescriptionRouter;
