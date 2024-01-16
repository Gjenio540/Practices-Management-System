import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config()

export const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT as unknown as number,
    secure: process.env.EMAIL_SECURE as unknown as boolean,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD, 
    },
});
