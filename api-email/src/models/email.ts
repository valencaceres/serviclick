import nodemailer from "nodemailer";
import dirPath from "path";

import config from "../utils/config";

type FromT = {
  name: string;
  domain: string;
};

const sendModel: any = async (
  from: FromT,
  to: string,
  subject: string,
  message: string,
  attachments: string[]
) => {
  try {
    return new Promise((resolve, reject) => {
      const transporter = nodemailer.createTransport({
        service: config.email.ServiClick.emailService,
        auth: {
          user: config.email.ServiClick.emailLogin,
          pass: config.email.ServiClick.emailPassword,
        },
      });

      const pdfPath = dirPath.join(__dirname, "../../../../", "output");

      const attachmentsData =
        attachments &&
        attachments.map((item: any) => {
          return {
            filename: item,
            path: dirPath.join(pdfPath, item),
          };
        });

      const mailOptions = {
        from: from.name
          ? `${from.name} <${config.email.ServiClick.emailLogin}>`
          : config.email.ServiClick.emailLogin,
        to,
        subject,
        html: message,
      };

      transporter.sendMail(
        attachments
          ? { ...mailOptions, attachments: attachmentsData }
          : mailOptions,
        (error, info) => {
          if (error) {
            resolve((error as Error).message);
          } else {
            resolve(info.response);
          }
        }
      );
    });
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export { sendModel };
