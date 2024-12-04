import axios from "axios";
import config from "./config";

const ApiPaymentInstance = axios.create({
  baseURL: `${config.apiPaymentURL}`,
  headers: { id: config.apiPaymentKey },
});

export { ApiPaymentInstance };
