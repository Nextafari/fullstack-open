const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')


const mongoUrl = config.DB_URL
mongoose.connect(mongoUrl).then(
  (result) => {
    console.log("connected to  MongoDB")
  }
).catch(
  (error) => {
    console.log('error connecting to MongoDB:', error.messaage)
  }
)

morgan.token('req-body', (req) => {return JSON.stringify(req.body)})

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :req-body'
  )
)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

module.exports = app
