// mailer.js
import nodemailer from 'nodemailer';

// Set up your email transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use your email service provider
  auth: {
    user: "akashseenivasan2005@gmail.com",
    pass: "hwsq bsdy xcyw ghdl"
  }
});

// Function to send email
const sendMail = (to, subject, text) => {
  const mailOptions = {
    from: 'akashseenivasan2005@gmail.com',
    to,
    subject,
    text
  };

  return transporter.sendMail(mailOptions);
};

export default sendMail;
