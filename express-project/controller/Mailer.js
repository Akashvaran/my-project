import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: "akashseenivasan2005@gmail.com",
    pass: "hwsq bsdy xcyw ghdl"
  }
});

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
