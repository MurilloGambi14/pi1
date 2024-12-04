const Game = require('../../../db/models/Game');

async function updateGamePhoto(app) {
  app.patch('/games/:id/photo', async (req, res) => {
    const { id } = req.params;
    const { photoLink } = req.body;

    if (!photoLink) {
      return res.status(400).send({ error: 'O campo photoLink é obrigatório.' });
    }

    try {
      const updatedGame = await Game.findByIdAndUpdate(
        id,
        { photoLink },
        { new: true, runValidators: true }
      );

      if (!updatedGame) {
        return res.status(404).send({ error: 'Jogo não encontrado.' });
      }

      return res.status(200).send({ message: 'Foto atualizada com sucesso!', game: updatedGame });
    } catch (error) {
      console.error('Erro ao atualizar a foto do jogo:', error);
      return res.status(500).send({ error: 'Erro ao atualizar a foto do jogo.' });
    }
  });
}

module.exports = updateGamePhoto;
