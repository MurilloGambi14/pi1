const Text = require('../../../db/models/Text')

async function updateText(app) {
  app.put('/texts/:id', async (req, res) => {
    try {
      const { content } = req.body
      const { id } = req.params

      const text = await Text.findOneAndUpdate({
        _id: id,
        content
      })

      text.content = content

      await text.save()

      return res.status(200).send({ message: `Texto editado com sucesso, novo conteúdo: ${text.content}` })
    } catch (e) {
      console.log('deu erro lek', e)
    }
  })
}

module.exports = updateText