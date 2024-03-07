import nodemailer from 'nodemailer';

// Create a transporter object using the default SMTP transport
export const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "araujo@cilabs.io", // generated ethereal user
    pass: "aEyzuJDUNkDm", // generated ethereal password
  },
});
