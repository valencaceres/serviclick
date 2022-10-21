import axiosMonitored from "./axios";

import config from "./config";

export const sendMail = (
  from: any,
  to: string,
  subject: string,
  message: string,
  attachments: string[]
) => {
  axiosMonitored(
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
};
