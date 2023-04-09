const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(
  {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'boykalexandr6@gmail.com',
      pass: 'karinakristina1',
    },
  },
  {
    from: 'Fish@ka <boykalexandr6@gmail.com>',
  }
);

module.exports = async (email, content) => {
  await transporter.sendMail({
    to: email,
    ...content,
  });
};
