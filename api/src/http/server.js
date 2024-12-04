const fastify = require('fastify')
const cors = require('@fastify/cors')
const cookie = require('@fastify/cookie')
const mongoose = require('mongoose')

const login = require('./routes/auth/login')
const me = require('./routes/auth/me')
const verify = require('./routes/auth/verify')
const logout = require('./routes/auth/logout')

const env = require('../env')
const sendMessage = require('./routes/contact/send-message')
const addFeedback = require('./routes/feedbacks/add-feedback')
const getFeedbacks = require('./routes/feedbacks/get-feedbacks')
const createText = require('./routes/texts/create-text')
const updateText = require('./routes/texts/update-text')
const getTexts = require('./routes/texts/get-texts')
const filterTextsByCategory = require('./routes/texts/filter-texts-by-category')
const addImage = require('./routes/images/add-image')
const removeImage = require('./routes/images/remove-image')
const deleteFeedback = require('./routes/feedbacks/delete-feedback')
const getGames = require('./routes/game/get-games')
const updateGamePhoto = require('./routes/game/update-game-image')
const createGame = require('./routes/game/create-game')

mongoose.connect(env.MONGO_URL)
const db = mongoose.connection

db.on('error', err => {
  console.log(err)
})

db.on('open', () => {
  console.log('[MONGODB] Connected to mongodb')
})

const app = fastify()

app.register(cors, {
  origin: 'http://127.0.0.1:5502',
  credentials: true,
  allowedHeaders: ['Set-Cookie', 'Content-Type']
})

app.register(cookie, {
  secret: '',
  hook: 'onRequest'
})

app.register(login)
app.register(me)
app.register(verify)
app.register(logout)

app.register(sendMessage)

app.register(addFeedback)
app.register(getFeedbacks)
app.register(deleteFeedback)

app.register(filterTextsByCategory)
app.register(createText)
app.register(updateText)
app.register(getTexts)

app.register(addImage)
app.register(removeImage)

app.register(getGames)
app.register(updateGamePhoto)
app.register(createGame)

app.listen({
  port: 3333
}).then(() => {
  console.log('Server running at 3333')
})