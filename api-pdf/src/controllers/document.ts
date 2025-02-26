import createLogger from "../utils/logger";
import * as Document from "../models/document";
import * as Test from "../models/test";

const createContract = async (req: any, res: any) => {
  try {
    const { lead_id, correlative, contact, company, customer, plan, policy } =
      req.body;

    const pdf = await Document.createContract(
      lead_id,
      correlative,
      contact,
      company,
      customer,
      plan,
      policy
    );

    createLogger.info({
      controller: "document/createContract",
      message: "OK",
    });

    res.status(200).json("OK");
  } catch (e) {
    createLogger.error({
      model: "document/createContract",
      error: (e as Error).message,
    });

    res.status(500).json({
      error: "document/createContract: " + (e as Error).message,
    });
  }
};

const createAnnex = async (req: any, res: any) => {
  try {
    const pdf = await Document.createAnnex(req.body);

    createLogger.info({
      controller: "document/createAnnex",
      message: "OK",
    });
    res.status(200).json("OK");
  } catch (e) {
    createLogger.error({
      model: "document/createAnnex",
      error: (e as Error).message,
    });
    res.status(500).json({
      error: "document/createAnnex: " + (e as Error).message,
    });
  }
};

const test = async (req: any, res: any) => {
  const response = Test.test();
  res.status(200).json(response);
};

export { createContract, createAnnex, test };
