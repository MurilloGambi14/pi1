const nodemailer = require('nodemailer')

const env = require('../../../env')

async function sendMessage(app) {
  app.post('/contact', async (req, res) => {
    const { name, email, phone, message } = req.body

    const transporter = nodemailer.createTransport({
      host: env.BREVO_HOST,
      port: Number(env.BREVO_PORT),
      auth: {
        user: env.BREVO_USER,
        pass: env.BREVO_PASS
      }
    })

    const mailOptions = {
      from: env.BREVO_SENDER,
      to: env.BREVO_RECEIVER,
      subject: `${name} - ${phone}`,
      text: `${message} - ${email}`
    }

    try {
      transporter.sendMail(mailOptions)

      return res.status(200).send({ message: 'Mensagem enviada com sucesso' })
    } catch (e) {
      console.log(e)
    }
  })
}

module.exports = sendMessage