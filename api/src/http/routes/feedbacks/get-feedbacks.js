const Feedback = require('../../../db/models/Feedback')

async function getFeedbacks(app) {
  app.get('/feedbacks', async (req, res) => {
    const feedbacks = await Feedback.find({})

    return res.status(200).send({ feedbacks })
  })
}

module.exports = getFeedbacks