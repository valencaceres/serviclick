import nodemailer from "nodemailer";

import config from "../utils/config";

type FromT = {
  name: string;
  domain: string;
};

const sendModel: any = async (
  from: FromT,
  to: string,
  subject: string,
  message: string
) => {
  try {
    return new Promise((resolve, reject) => {
      const transporter = nodemailer.createTransport({
        service: config.email[from.domain].emailService,
        auth: {
          user: config.email[from.domain].emailLogin,
          pass: config.email[from.domain].emailPassword,
        },
      });

      const mailOptions = {
        from: from.name
          ? `${from.name} <${config.email[from.domain].emailLogin}>`
          : config.email[from.domain].emailLogin,
        to,
        subject,
        html: message,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          resolve((error as Error).message);
        } else {
          resolve(info.response);
        }
      });
    });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export { sendModel };
