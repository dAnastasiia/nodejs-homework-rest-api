const nodemailer = require('nodemailer')
require('dotenv').config()

class CreateSender {
  async send(msg) {
    const config = {
      host: 'smtp.meta.ua',
      port: 465,
      secure: true, 
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD, 
      },
    }
    const transporter = nodemailer.createTransport(config)
    return await transporter.sendMail({ ...msg, from: `Contacts System <${process.env.NODEMAILER_EMAIL}>` })
  }
}

module.exports = { CreateSender }
