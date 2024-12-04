import axios from "axios";
import config from "./config";

const ApiPaymentInstance = axios.create({
  baseURL: `${config.apiPayment}`,
  headers: {id: config.apiPaymentKey}
});

export {ApiPaymentInstance}