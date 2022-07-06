const express = require('express')
const mongoose = require('mongoose')
const rootRouter = require('./routers')
require('dotenv').config()
const app = express()
const port = 3000
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('connect db success')
  })
  .catch((error) => {
    console.log('error:', error)
  })

// express.json() replace body-parser (see data from req.body)
app.use(express.json())
app.use('/v1/api', rootRouter)
app.listen(port, () => {
  console.log(`app is running on port ${port}`);
})
