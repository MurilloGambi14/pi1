const auth = require('../../../middlewares/auth')

async function logout(app) {
  app.post('/auth/logout', { preHandler: auth }, async (req, res) => {
    res.clearCookie('token')

    return res.send({ message: 'Logged out successfully' })
  })
}

module.exports = logout