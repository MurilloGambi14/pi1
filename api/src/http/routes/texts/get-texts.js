const Text = require('../../../db/models/Text')

async function getTexts(app) {
  app.get('/texts', async (req, res) => {
    const texts = await Text.find({})

    return res.status(200).send({ texts })
  })
}

module.exports = getTexts