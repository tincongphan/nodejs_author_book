const express = require('express')
const validateAuthor = require('../validates/validateAuthor')
const validateBook = require('../validates/validateBook')
const authorRouter = require('./authorRouter')
const bookRouter = require('./bookRouter')
const rootRouter = express.Router()
rootRouter.use('/authors', authorRouter)
rootRouter.use('/books', bookRouter)
module.exports = rootRouter