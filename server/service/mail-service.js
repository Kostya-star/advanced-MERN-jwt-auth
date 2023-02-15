const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.SENDER,
    pass: process.env.SENDER_PASSWORD
  }
});

async function sendActivationMail(to, link) {
  await transporter.sendMail({
    from: process.env.SENDER,
    to,
    subject: `Account activation on ${process.env.API_URL}`,
    text: '',
    html:
      `
      <div>
        <h1>To activate your account please follow the link below</h1>
        <a href='${link}'>${link}</a>
      </div>
      `
  });
}

module.exports = {
  sendActivationMail
};