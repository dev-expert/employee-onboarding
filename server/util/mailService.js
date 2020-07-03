const nodeMailer = require('nodemailer');
const config = require('./config');
var mailService = nodeMailer.createTransport({
  service: config.mailService,
  auth: {
    user: config.email,
    pass: config.password,
  },
});

const sendMail = (mail) => {
  try {
    mailService.sendMail({ ...mail, from: config.email }, function (
      error,
      info
    ) {
      if (error) {
        console.log('Error:', error);
      } else {
        console.log('Sent: ' + info.response);
      }
    });
  } catch (e) {}
};

module.exports = { sendMail };
