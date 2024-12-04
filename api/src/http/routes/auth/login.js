const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const loginSchema = require('../../../schemas/loginSchema');
const env = require('../../../env');

async function login(app) {
  app.post('/auth/login', async (req, res) => {
    const loginInformations = loginSchema.safeParse(req.body);

    if (!loginInformations.success || !loginInformations.data) {
      return res.status(400).send({
        error: 'Login informations incomplete or invalid',
      });
    }

    const { username, password } = loginInformations.data;

    const usernameMatches = await bcrypt.compare(
      username,
      String(env.LOGIN_USERNAME)
    );

    if (!usernameMatches) {
      return res.status(401).send({ message: 'Invalid username' });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      String(env.LOGIN_PASSWORD)
    );

    if (!passwordMatches) {
      return res.status(401).send({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      {
        isAdmin: true,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '24h',
      }
    );

    res.setCookie('token', token, {
      httpOnly: true,
      maxAge: 86400,
      path: '/',
      sameSite: 'Lax',
      secure: false,
    });

    return res.status(200).send({
      message: 'Login successful',
    });
  });
}

module.exports = login;
