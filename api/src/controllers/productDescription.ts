import createLogger from "../util/logger";

import * as ProductDescription from "../models/productDescription";
import * as Assistance from "../models/assistance";

const getByProductId = async (req: any, res: any) => {
  const { lead_id, id } = req.params;

  const productResponse = await ProductDescription.getByProductId(lead_id, id);

  if (!productResponse.success) {
    createLogger.error({
      model: "productDescription/getByProductId",
      error: productResponse.error,
    });
    res.status(500).json({ error: productResponse.error });
    return;
  }

  const assistanceResponse = await Assistance.getAll();

  if (!assistanceResponse.success) {
    createLogger.error({
      model: "productDescription/getAll",
      error: assistanceResponse.error,
    });
    res.status(500).json({ error: assistanceResponse.error });
    return;
  }

  type AssistanceT = {
    id: string;
    name: string;
    description: string;
    amount: number;
    maximum: string;
    events: number;
    lack: number;
    currency: string;
    benefits: string[];
    exclusions: string[];
  };

  type DataT = {
    id: string;
    name: string;
    title: string;
    subTitle: string;
    description: string;
    territorialScope: string;
    hiringConditions: string;
    assistances: AssistanceT[];
  };

  const dataAssistances: AssistanceT[] = productResponse.data.assistances.map(
    (item: AssistanceT) => {
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        amount: item.amount,
        maximum: item.maximum,
        events: item.events,
        lack: item.lack,
        currency: item.currency,
        benefits: assistanceResponse.data.benefits
          .filter((benefit: any) => benefit.assistance_id === item.id)
          .map((ex: any) => ex.description),
        exclusions: assistanceResponse.data.exclusions
          .filter((exclusion: any) => exclusion.assistance_id === item.id)
          .map((ex: any) => ex.description),
      };
    }
  );

  let data = {
    lead_id,
    id: id,
    name: productResponse.data.name,
    title: productResponse.data.title,
    subTitle: productResponse.data.subTitle,
    description: productResponse.data.description,
    territorialScope: productResponse.data.territorialScope,
    hiringConditions: productResponse.data.hiringConditions,
    assistances: dataAssistances,
  };

  createLogger.info({
    controller: "products/getByProductId",
    message: "OK",
  });

  res.status(200).json(data);
};

export { getByProductId };
