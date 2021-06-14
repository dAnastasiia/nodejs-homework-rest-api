const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const path= require('path')
require('dotenv').config()

const usersRouter = require('./routes/api/users/index')
const contactsRouter = require('./routes/api/contacts/index')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, process.env.IMAGE_DIR)))

app.use('/api/users', usersRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ status: 'error', code: 404, message: 'Not found' })
})

app.use((err, req, res, next) => {
  const status = err.status || 500

  res.status(status).json({status: 'fail', code: 500, message: err.message })
})

module.exports = app