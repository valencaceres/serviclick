import createLogger from "../util/logger";
import * as Document from "../models/document";

const Upsert = async (req: any, res: any) => {
  const { lead_id, document } = req.body;
  const documentResponse = await Document.upsert(lead_id, document);
  if (!documentResponse.success) {
    createLogger.error({
      model: "document/Upsert",
      error: documentResponse.error,
    });
    res
      .status(500)
      .json({ success: false, data: null, error: "Error creating document" });
    return;
  }

  createLogger.info({
    controller: "document/Upsert",
    message: "OK",
  });
  res
    .status(200)
    .json({ success: true, data: documentResponse.data, error: null });
};

export { Upsert };
