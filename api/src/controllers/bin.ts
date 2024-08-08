import createLogger from "../util/logger";
import * as Bin from "../models/bin";
import { Request, Response } from "express";

const createBin = async (req: Request, res: Response) => {
  try {
    const { broker_id, holding, brand, bin, product, type } = req.body;
    const response = await Bin.createBin(
      broker_id,
      holding,
      brand,
      bin,
      product,
      type
    );
    if (!response.success) {
      return res.status(500).json("Error with response");
    }
    return res.status(500).json(response.data);
  } catch (e: any) {
    return res.status(500).json("Error creating bin");
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const { bin } = req.params;
    const binId = parseInt(bin);
    const response = await Bin.getById(binId);
    if (!response?.success) {
      return res.status(500).json({ success: false, data: null });
    }
    res.status(200).json({ success: true, data: response.data });
  } catch (e: any) {
    return res.status(500).json({ success: false, data: null });
  }
};

export { createBin, getById };
