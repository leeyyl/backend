const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const cors = require('cors')
// const morgan = require('morgan')
const logger = require('./utils/logger')
const notes = require('./controllers/notes')
const users = require('./controllers/users')
const login = require('./controllers/login')
const middle = require('./utils/middleware')
const mongoose = require('mongoose')

const url = `mongodb+srv://lee:${config.DB_PASSWORD}@cluster0.syuc4.mongodb.net/${config.DB_NAME}?ssl=true&authSource=admin`
logger.info(url)
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => logger.info('connected success'))
  .catch((error) => logger.error('connect error: ', error.message))

const app = express()

app.use(cors())
app.use(express.json())
// app.use(morgan('tiny'))
app.use(middle.requestLogger)

app.use('/api/notes', notes)
app.use('/api/users', users)
app.use('/api/login', login)

app.use(middle.unknownEndpoint)
app.use(middle.errorHandler)

module.exports = app