const Text = require('../../../db/models/Text')

async function filterTextsByCategory(app) {
  app.get('/texts/:category', async (req, res) => {
    const { category } = req.params

    const texts = await Text.find({
      category
    })

    return res.status(200).send({ message: `Textos da categoria ${category} encontrados!`, texts })
  })
}

module.exports = filterTextsByCategory