import createLogger from "../util/logger";

import * as Slug from "../models/slug";
import * as Retail from "../controllers/retail";
import * as Broker from "../controllers/broker";

const getByCode = async (req: any, res: any) => {
  const { code } = req.params;
  const slugResponse = await Slug.getByCode(code);

  if (!slugResponse.success) {
    createLogger.error({
      model: "slug/getByCode",
      error: slugResponse.error,
    });
    res.status(500).json({ error: slugResponse.error });
    return;
  }

  const { channel_code, agent_id } = slugResponse.data;

  const agentResponse =
    channel_code === "retail"
      ? await Retail.getRetailDataById(agent_id)
      : await Broker.getBrokerDataById(agent_id);

  if (!agentResponse.success) {
    createLogger.error({
      model: `${channel_code}/getById`,
      error: agentResponse.error,
    });
    res.status(500).json({ error: agentResponse.error });
    return;
  }

  const productsResponse = await createLogger.info({
    controller: "slug/getByCode",
    message: "OK",
  });
  res.status(200).json(agentResponse.data);
};

export { getByCode };
