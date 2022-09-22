import nodemailer from "nodemailer";

import config from "../utils/config";

const sendModel: any = async (
  from: string,
  to: string,
  subject: string,
  message: string
) => {
  try {
    return new Promise((resolve, reject) => {
      const transporter = nodemailer.createTransport({
        service: config.emailService,
        auth: {
          user: config.emailLogin,
          pass: config.emailPassword,
        },
      });

      const mailOptions = {
        from: from ? `${from} <${config.emailLogin}>` : config.emailLogin,
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
