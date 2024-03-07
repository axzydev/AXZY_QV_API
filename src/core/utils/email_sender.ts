import path from "path";
import fs from "fs";
import { transporter } from "../config/smtp";

export const sendConfirmationEmail = async (name: string, email: string, token: string ) => {
    const filePath = path.join(__dirname, './templates/confirmation.html');

    const html = await fs.promises.readFile(filePath, 'utf8');
    const confirmationUrl = `http://localhost:4000/users/confirmation?token=${token}`;
    const personalizedHtml = html.replace("{{confirmationUrl}}", confirmationUrl).replace("{{userName}}", name);
    // Send mail with defined transport object
    await transporter.sendMail({
      from: "araujo@cilabs.io", // sender address
      to: email, // list of receivers
      subject: "Confirmation Email", // Subject line
      text: `Welcome to the jg`, // plain text body
      html: personalizedHtml // html body
    }).catch(err => {
      console.log(err);
    });
};

export const sendResetPasswordEmail = async (name: string, email: string, token: string ) => {
    const filePath = path.join(__dirname, './templates/reset-password.html');

    const html = await fs.promises.readFile(filePath, 'utf8');
    const resetPasswordUrl = `http://localhost:4000/users/reset_password?token=${token}`;
    const personalizedHtml = html.replace("{{resetPasswordUrl}}", resetPasswordUrl).replace("{{userName}}", name);
    // Send mail with defined transport object
    await transporter.sendMail({
      from: "araujo@cilabs.io",
      to: email,
      subject: "Reset Password",
      text: `Reset your password`,
      html: personalizedHtml
    }).catch(err => {
      console.log(err);
    });
}