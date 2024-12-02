import config from "./config";
import CryptoJS from "crypto-js";

const jsonToSignature = (data: { [key: string]: any }) => {
  const keys = Object.keys(data).sort();

  let signature = "";
  for (const key of keys) {
    signature += `${key}${data[key]}`;
  }
  const sign = CryptoJS.HmacSHA256(
    signature.trim(),
    config.flowSecretKey
  ).toString();

  return sign.trim();
};

export default jsonToSignature;
