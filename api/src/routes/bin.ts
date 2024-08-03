import { Router } from "express";
import auth from "../middlewares/auth";
import { createBin, getById } from "../controllers/bin";

const BinRouter = Router()

BinRouter.post('/create', auth, createBin)
BinRouter.get('/getById/:bin', auth, getById)

export default BinRouter