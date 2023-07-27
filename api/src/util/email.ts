import axiosMonitored from "./axios";

import config from "./config";

export const sendMail = async (
  from: any,
  to: string,
  subject: string,
  message: string,
  attachments: string[]
) => {
  const emailResponse = await axiosMonitored(
    "post",
    config.email.URL.send,
    {
      from,
      to,
      subject,
      message,
      attachments,
    },
    config.email.apiKey
  );

  return emailResponse;
};

export const fillEmptyEmail = (rutFull: string): string => {
  let rut: string = "";
  let dv: string = "";

  if (rutFull.indexOf("-") > 0) {
    const oRut = rutFull.split("-");
    rut = String(oRut[0].split(".").join(""));
    dv = oRut[1];
  } else {
    rut = String(rutFull.substring(0, rutFull.length - 1));
    dv = rutFull.substring(rutFull.length - 1);
  }

  rut = rut.split(".").join("");
  rut = rut.split(",").join("");

  return "clientes+" + rut + dv + "@serviclick.cl";
};
