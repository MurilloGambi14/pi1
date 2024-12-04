const Feedback = require('../../../db/models/Feedback')

async function deleteFeedback(app) {
  app.delete('/feedbacks/:id', async (req, res) => {
    try {
      const { id } = req.params

      await Feedback.findByIdAndDelete(id)

      return res.status(200).send({ message: 'Feedback enviado com sucesso' })
    } catch (e) {
      console.log('deu pau lek', e)
    }
  })
}

module.exports = deleteFeedback