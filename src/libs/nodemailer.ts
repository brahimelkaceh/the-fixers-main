// config/nodemailer.ts

import nodemailer, { Transporter } from 'nodemailer';

interface MailOptions {
  from?: string;
  to?: string;
  // Add any additional properties as needed
}

const email = process.env.NEXT_PUBLIC_EMAIL;
const pass = process.env.NEXT_PUBLIC_EMAIL_PASS;

export const transporter: Transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass,
  },
});
console.log('transporter', transporter);

export const mailOptions: MailOptions = {
  from: email,
  to: 'brahimsuba@gmail.com',
  // Add any additional properties as needed
};
