const auth = require('../../../middlewares/auth')

async function verify(app) {
  app.get('/auth/verify', { preHandler: auth }, async (req, res) => {
    res.status(200).send({ loggedIn: true })
  })
}

module.exports = verify