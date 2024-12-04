const Feedback = require('../../../db/models/Feedback')

async function addFeedback(app) {
  app.post('/feedbacks', async (req, res) => {
    try {
      const { username, comment } = req.body

    const feedback = new Feedback({
      username,
      comment
    })

    await feedback.save()

    return res.status(200).send({ message: 'Feedback enviado com sucesso' })
    } catch (e) {
      console.log('deu pau lek', e)
    }
  })
}

module.exports = addFeedback