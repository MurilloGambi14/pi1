const Game = require('../../../db/models/Game');

async function getGames(app) {
  app.get('/games', async (req, res) => {
    try {
      const games = await Game.find({});
      return res.status(200).send({ games });
    } catch (error) {
      console.error('Erro ao buscar jogos:', error);
      return res.status(500).send({ error: 'Erro ao buscar os jogos.' });
    }
  });
}

module.exports = getGames;
