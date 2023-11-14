require('dotenv').config()
const { PORT, MONGODB_USER, MONGODB_PASSWORD, MONGODB_CLUSTER } = process.env

const express = require('express')
const app = express()

const mongoose = require('mongoose')

mongoose.connect(
  `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`
)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'ERROR: CANNOT CONNECT TO MONGO DB'))
db.once('open', () => console.log('CONNECTED TO MONGO DB'))

const adminRouter = require('./routers/admin-router').router

// API Rest JSON
const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.use('/admin/', adminRouter)
// app.use('/ingredients/', ingredientsRouter)
// app.use('/receipes/', receipesRouter)

app.get('/hello-docker/', (req, res) => {
  console.log('index.js > New request at', new Date().toISOString())
  return res.json({ msg: 'Hello from Docker!' })
})

app.listen(PORT, () =>
  console.log(
    new Date().toISOString(),
    `Application lancée sur le port ${PORT} !!!`
  )
)
