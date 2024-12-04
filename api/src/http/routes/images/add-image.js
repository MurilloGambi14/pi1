const Image = require('../../../db/models/Image')

async function addImage(app) {
  app.post('/images', async (req, res) => {
    const { username, comment } = req.body

    const image = new Image({
      username,
      comment
    })

    await image.save()

    return res.status(200).send({ message: 'Imagem enviada com sucesso' })
  })
}

module.exports = addImage