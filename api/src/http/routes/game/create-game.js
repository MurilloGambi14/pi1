const Game = require('../../../db/models/Game');

async function createGame(app) {
  app.post('/games', async (req, res) => {
    const { name, photoLink, href } = req.body;

    if (!name || !photoLink || !href) {
      return res.status(400).send({ error: 'Os campos name, photoLink e href são obrigatórios.' });
    }

    try {
      const newGame = await Game.create({ name, photoLink, href });

      return res.status(201).send({ message: 'Jogo criado com sucesso!', game: newGame });
    } catch (error) {
      console.error('Erro ao criar jogo:', error);

      if (error.name === 'ValidationError') {
        return res.status(400).send({ error: 'Dados inválidos.', details: error.errors });
      }
      return res.status(500).send({ error: 'Erro ao criar o jogo.' });
    }
  });
}

module.exports = createGame;
