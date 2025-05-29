import { appConfig } from 'config/appConfig';
import nodemailer from 'nodemailer';

/**
 * SMTP
 */
const transporter = nodemailer.createTransport(
  {
    host: 'smtp.gmail.com', // smtp.mailgun.org | smtp.gmail.com
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS,
    },
  },
  {
    from: `${appConfig.APP_NAME} <${process.env.MAILER_USER}>`,
  }
);

type Message = {
  to?: string;
  subject: string;
  html: string;
  attachments?: { path: string }[];
  bcc?: string[];
};

const mailer = async (message: Message) => {
  try {
    await transporter.sendMail(message);
  } catch {}
};

export default mailer;
