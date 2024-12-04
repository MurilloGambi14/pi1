const Text = require('../../../db/models/Text')

async function createText(app) {
  app.post('/texts', async (req, res) => {
    const { content, category } = req.body

    const text = new Text({
      content,
      category
    })

    await text.save()

    return res.status(200).send({ message: 'Texto criado com sucesso' })
  })
}

module.exports = createText