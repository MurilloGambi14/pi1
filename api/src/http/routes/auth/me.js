const auth = require('../../../middlewares/auth')

async function me(app) {
  app.get('/auth/me', { preHandler: auth }, async (req, res) => {
    const user = req.user

    if (!user) return res.status(404).send({ message: 'User not found' })

    res.status(200).send({
      user: {
        username: user.username,
        type: user.isAdmin ? 'ADMIN' : 'USER',
      },
    })
  })
}

module.exports = me