const bcrypt = require('bcryptjs');
const env = require('../env')

const hash = async () => {
  const username = env.LOGIN_USERNAME
  const password = env.LOGIN_PASSWORD

  const hashedUsername = await bcrypt.hash(username, 10);
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log('Hashed Username:', hashedUsername);
  console.log('Hashed Password:', hashedPassword);
}

hash()