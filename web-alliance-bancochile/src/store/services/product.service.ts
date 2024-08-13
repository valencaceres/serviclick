import { apiInstance } from "../../utils/api";
import config from "../../utils/config";

export const getProductList = async () => {
  try {
    const { data } = await apiInstance.get(
      `/broker/getProductsAndAssistancesByBrokerId/${config.service}`
    );
    return data;
  } catch (e) {
    throw e;
  }
};

export const getAssistancesByBrokerIdAndProductId = async (
  product_id: string
) => {
  try {
    const { data } = await apiInstance.get(
      `/broker/getAssistancesByBrokerIdAndProductId?broker_id=${config.service}&product_id=${product_id}`
    );
    return data;
  } catch (e) {
    throw e;
  }
};
