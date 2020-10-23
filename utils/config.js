require('dotenv').config()

const PORT = process.env.PORT
const DB_PASSWORD = process.env.DB_PASSWORD

let DB_NAME = 'fullstack'
if (process.env.NODE_ENV === 'test') {
  DB_NAME = 'test'
}

module.exports = { PORT, DB_PASSWORD, DB_NAME }