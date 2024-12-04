const Image = require('../../../db/models/Image')

async function removeImage(app) {
  app.delete('/images', async (req, res) => {
    const { imageId } = req.body

    await Image.findByIdAndDelete(imageId)

    return res.status(200).send({ message: 'Imagem enviada com sucesso' })
  })
}

module.exports = removeImage