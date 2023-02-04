require('dotenv').config();
const nodemailer = require('nodemailer');
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
console.clear();

console.log({ SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS });

const config = {
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: true,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
};

const transporter = nodemailer.createTransport(config);

async function sendEmail(data) {
  const emailOptions = {
    ...data,
    from: SMTP_USER,
  };

  const result = await transporter.sendMail(emailOptions);
  return result;
}

const verifyEmail = {
  to: 'khsanchos@mail.com',
  subject: 'Verify email',
  text: 'Hello World',
  // text: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click to verify email</a>`,
};

sendEmail(verifyEmail)
  .then(console.log)
  .catch(err => {
    console.log('mail error');
    console.log(err);
    console.log(err.message);
  });
