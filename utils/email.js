const nodemailer = require("nodemailer");
const transport = nodemailer.createTransport({
  host: "sendinblue",
  port: 2525,
  auth: {
    user: "73c0175af6ebd4",
    pass: "b51563fac6154f",
  },
});
