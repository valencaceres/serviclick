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
