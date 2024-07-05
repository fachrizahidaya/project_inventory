const { createTransport } = require("nodemailer");

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: "fachriza.hidaya98@gmail.com",
    pass: "spiqvsxqskwasheq",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
