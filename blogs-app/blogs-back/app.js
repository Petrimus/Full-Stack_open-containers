const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const notesRouter = require('./controllers/blogs')
const config = require('./utils/config')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()

mongoose.set('useCreateIndex', true)

mongoose
  .connect(config.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connect to database')
  })
  .catch((error) => {
    console.log(error)
  })

mongoose.set('useFindAndModify', false)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', notesRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

module.exports =  app