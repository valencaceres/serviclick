import createLogger from "../util/logger";
import * as Beneficiary from "../models/beneficiary";

const getByRut = async (req: any, res: any) => {
    const {rut} = req.params;
  const beneficiaryResponse = await Beneficiary.getByRut(rut);

  if (!beneficiaryResponse.success) {
    createLogger.error({
      model: "beneficiary/getByRut",
      error: beneficiaryResponse.error,
    });
    res.status(500).json({ error: "Error retrieving beneficiary" });
    return;
  }

  createLogger.info({
    controller: "beneficiary/getByRut",
    message: "OK",
  });
  res.status(200).json(beneficiaryResponse.data);
};

export { getByRut };
