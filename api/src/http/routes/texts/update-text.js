const Text = require('../../../db/models/Text');
const mongoose = require('mongoose');
async function updateText(app) {
  app.put('/texts/:id', async (req, res) => {
    try {
      const { content } = req.body;
      const { id } = req.params;


      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'ID inválido' });
      }



      const text = await Text.findOneAndUpdate(
        { _id: id }, 
        { $set: { content } }, 
        { new: true, runValidators: true }
      );

      if (!text) {
        return res.status(404).send({ message: 'Texto não encontrado' });
      }


      return res.status(200).send({ message: `Texto editado com sucesso, novo conteúdo: ${text.content}` });
    } catch (e) {
      return res.status(500).send({ message: 'Erro interno do servidor' });
    }
  });
}

module.exports = updateText;

