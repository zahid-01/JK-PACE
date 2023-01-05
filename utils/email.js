const nodeMailer = require('nodemailer');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `JK PACE <${process.env.EMAIL_FROM}>`;
  }

  newTransporter() {
    return nodeMailer.createTransport({
      service: 'SendinBlue',
      auth: {
        user: process.env.SENDINBLUE_USERNAME,
        pass: process.env.SENDINBLUE_PASSWORD,
      },
    });
  }

  async sendEmail(template, subject) {
    let mailOPtions;
    if (template === 'passwordReset') {
      mailOPtions = {
        from: this.from,
        to: this.to,
        html: this.url,
        subject,
      };
    }
    if (template === 'welcome') {
      mailOPtions = {
        from: this.from,
        to: this.to,
        html: 'Welcome to JK PACE, please find your credentials attatched',
        subject,
      };
    }

    //3) Create a transporter and send email
    await this.newTransporter().sendMail(mailOPtions);
  }

  async sendWelcome() {
    await this.sendEmail('welcome', 'Welcome to natours!');
  }

  async sendPasswordReset() {
    await this.sendEmail('passwordReset', 'Reset your password');
  }
};
